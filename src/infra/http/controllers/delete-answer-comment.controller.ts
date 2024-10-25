import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { userPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/answers/comments/:id')
export default class DeleteAnswerCommentController {
  constructor(private deleteAnswerComment: DeleteAnswerCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: userPayload,
    @Param('id') commentId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteAnswerComment.execute({
      authorId: userId,
      answerCommentId: commentId,
    })

    if (result.isLeft()) {
      console.log(result.value)
      throw new BadRequestException()
    }
  }
}
