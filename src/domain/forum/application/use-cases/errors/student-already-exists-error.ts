import { UseCasesError } from '@/core/errors/use-cases-error'

export class StudentAlreadyExistsError extends Error implements UseCasesError {
  constructor(identifier: string) {
    super(`Student ${identifier} already exists.`)
  }
}
