// Here we fetch the remote schema from the graphql endpoint, merge it with the client operations and
// generate the typings respectively.
import * as path from 'path'
import getTypes from './generateTypes'

const generatedEnumsTypesOut = './generated.enums.ts'
const generatedTypesOut = './generated.ts'
const pathsToLocalSchemas = [path.resolve(__dirname, '../../../**/!(*.subscription).graphql')]
getTypes(generatedTypesOut, generatedEnumsTypesOut, pathsToLocalSchemas)
