import { UseCasesError } from '@/core/errors/use-cases-error'

export class InvalidAttachmentTypeError extends Error implements UseCasesError {
  constructor(type: string) {
    super(`File type ${type} is not valid.`)
  }
}
