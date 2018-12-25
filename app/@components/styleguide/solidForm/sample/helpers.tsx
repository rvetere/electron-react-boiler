import { IGroupType, ISelectOption } from '@core/solidForm'
import React from 'react'

export const selectOptions: ISelectOption[] = []
for (let i = 0, len = 20; i < len; i++) {
  selectOptions.push({ value: i, label: `Option ${i + 1}` })
}

export const selectOptionsWithTemplate: ISelectOption[] = []
for (let i = 0, len = 20; i < len; i++) {
  selectOptionsWithTemplate.push({ value: i, label: `Option ${i + 1}`, template: <span>[image] {`Option ${i + 1}`}</span> })
}

const CONTRIBUTORS: ISelectOption[] = [
  { value: 'jedwatson', label: 'Jed Watson' },
  { value: 'bruderstein', label: 'Dave Brotherstone' },
  { value: 'jossmac', label: 'Joss Mackison' },
  { value: 'jniechcial', label: 'Jakub Niechciał' },
  { value: 'craigdallimore', label: 'Craig Dallimore' },
  { value: 'julen', label: 'Julen Ruiz Aizpuru' },
  { value: 'dcousens', label: 'Daniel Cousens' },
  { value: 'jgautsch', label: 'Jon Gautsch' },
  { value: 'dmitry-smirnov', label: 'Dmitry Smirnov' }
]
const MAX_CONTRIBUTORS: number = 6
const ASYNC_DELAY: number = 500

export const getSelectOptions = (input: string): Promise<IGroupType<ISelectOption>> => {
  return new Promise(
    (resolve: (options: IGroupType<ISelectOption>) => void, _reject: (reason: string) => void): NodeJS.Timer => {
      input = input.toLowerCase()
      let optionsFiltered: ISelectOption[] = CONTRIBUTORS.filter(
        (i: ISelectOption): boolean => {
          const valueStr: string = `${i.value || ''}`
          return valueStr.indexOf(input) > -1
        }
      )
      let data: IGroupType<ISelectOption> = {
        options: optionsFiltered.slice(0, MAX_CONTRIBUTORS),
        complete: optionsFiltered.length <= MAX_CONTRIBUTORS
      }
      return setTimeout(() => {
        resolve(data)
      }, ASYNC_DELAY)
    }
  )
}
