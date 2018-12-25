// Here we fetch the remote schema from the graphql endpoint, merge it with the client operations and
// generate the typings respectively.
// We distinguish between a 'generated' and 'generated.enums' file.
// The former includes all (client) operations and remote schema definitions.
// The generated.enums file on the other hand only includes enums (and some artifacts).
// Unfortunately we have to do this because graphql-code-generator uses namespaces for the client operations which is not supported by our TypeScript compiler (babel7).
// Have a look at https://github.com/dotansimha/graphql-code-generator
import * as fs from 'fs'
import { execute, ExecutionResult, GraphQLSchema, parse } from 'graphql'
import { generate } from 'graphql-code-generator'
import { makeExecutableSchema } from 'graphql-tools'
import { buildClientSchema, introspectionQuery, printSchema } from 'graphql/utilities'
import https from 'https'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import fetch from 'node-fetch'
import * as path from 'path'
import logger from '../../@helpers/logger'

const graphqlEndpoint = process.env.GRAPHQL
const clientSchema = path.resolve(__dirname, './client/**/*.gql')
const graphqlSchemaFile = path.resolve(__dirname, './graphqlSchema.json')
let generatedEnumsTypesOut: string
let generatedTypesOut: string
let args: string[] | undefined
const configFile = path.resolve(__dirname, './gql-gen.json')

const fetchRemoteSchema = async (url: string | undefined, insecure: boolean): Promise<GraphQLSchema> => {
  if (typeof url === 'undefined') {
    throw new Error('No correct graphql endpoint was passed')
  }

  const agent = /^https:\/\//i.test(url) && insecure ? new https.Agent({ rejectUnauthorized: false }) : undefined
  const body = JSON.stringify({ query: introspectionQuery })
  const method = 'POST'
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  try {
    const response = await fetch(url, {
      agent,
      method,
      headers,
      body
    })
    const result = await response.json()

    if (result.errors) {
      throw new Error(`Errors in introspection query result: ${result.errors}`)
    }
    if (!result.data) {
      throw new Error(`No introspection query result data from: ${JSON.stringify(result)}`)
    }
    return buildClientSchema(result.data)
  } catch (e) {
    throw new Error(`Error while fetching introspection query: ${e.message}`)
  }
}

// copied from graphql-js library, will be released in new version
// https://github.com/graphql/graphql-js/blob/master/src/utilities/introspectionFromSchema.js
const introspectionFromSchema = async (schema: GraphQLSchema): Promise<ExecutionResult | undefined> => {
  const queryAST = parse(introspectionQuery)
  const result = await execute(schema, queryAST)
  return result.data
}

const introspectSchema = async (): Promise<void> => {
  return fetchRemoteSchema(graphqlEndpoint, true)
    .then((schema: GraphQLSchema) => {
      const clientSchemas = fileLoader(clientSchema)
      const remoteSchema = printSchema(schema)
      const typeDefs = mergeTypes([...clientSchemas, remoteSchema], {
        all: true
      })
      return makeExecutableSchema({ typeDefs })
    })
    .then((schema: GraphQLSchema) => {
      return introspectionFromSchema(schema)
    })
    .then((introspection: ExecutionResult) => {
      const json = JSON.stringify(introspection, null, 0)
      fs.writeFileSync(graphqlSchemaFile, json)
    })
    .catch((err: Error) => {
      logger.error('Error while generating types for schema:', err)
    })
}

const generateServerTypes = async (): Promise<void> => {
  try {
    await generate({
      template: 'graphql-codegen-typescript-template',
      overwrite: true,
      out: generatedTypesOut,
      config: configFile,
      schema: graphqlSchemaFile,
      args
    })
  } catch (err) {
    logger.error(err)
  }
}

const generateEnums = async (): Promise<void> => {
  try {
    await generate({
      template: 'graphql-codegen-typescript-template',
      overwrite: true,
      skipSchema: true,
      out: generatedEnumsTypesOut,
      config: configFile,
      schema: graphqlEndpoint
    })
  } catch (err) {
    logger.error(err)
  }
}

// Generate an introspection JSON format from remote GraphQL server merging
// with any local GraphQL schemas (@client stuff).
// When successful create the types from the generated JSON schema
const getTypes = async (outPath: string, outPathEnum: string = '', argsWhy?: string[]): Promise<void> => {
  generatedTypesOut = path.resolve(__dirname, outPath)
  generatedEnumsTypesOut = path.resolve(__dirname, outPathEnum)
  args = argsWhy
  introspectSchema()
    .then(generateEnums)
    .then(generateServerTypes)
    .then(() => {
      fs.unlinkSync(graphqlSchemaFile)
    })
    .catch((err: Error) => {
      logger.error('Error while generating types for schema: ', err)
    })
}

export default getTypes
