import { UseCasesError } from '@/core/errors/use-cases-error'

export class WrongCredentialsError extends Error implements UseCasesError {
  constructor() {
    super('Credentials are not valid.')
  }
}
