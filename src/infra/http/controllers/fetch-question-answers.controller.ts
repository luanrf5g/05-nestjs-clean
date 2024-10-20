import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AnswerPresenter } from '../presenters/answer-presentes'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswersController {
  constructor(private fetchQuestions: FetchQuestionAnswersUseCase) {}

  @Get()
  async handle(
    @Query('page ', queryValidationPipe) page: PageQueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestions.execute({
      questionId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answers = result.value.answers

    return {
      answers: answers.map(AnswerPresenter.toHTTP),
    }
  }
}
