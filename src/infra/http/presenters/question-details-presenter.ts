import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId,
      authorId: questionDetails.authorId,
      authorName: questionDetails.author,
      title: questionDetails.title,
      slug: questionDetails.slug,
      content: questionDetails.content,
      attachment: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
      bestAnswerId: questionDetails.bestAnswerId,
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
