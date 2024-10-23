import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { userPayload } from '@/infra/auth/jwt.strategy'

const commentAnswerBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentAnswerBodySchema)

type CommentAnswerBodySchema = z.infer<typeof commentAnswerBodySchema>

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentOnAnswer: CommentOnAnswerUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentAnswerBodySchema,
    @CurrentUser() user: userPayload,
    @Param('answerId') answerId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentOnAnswer.execute({
      authorId: userId,
      answerId,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
