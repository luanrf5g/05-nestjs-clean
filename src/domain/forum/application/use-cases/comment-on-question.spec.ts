import { InMemoryQuestionsCommentsRepository } from '@/test/repositories/in-memory-questions-comments-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachments-repository'

let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let questionsCommentsRepository: InMemoryQuestionsCommentsRepository
let questionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question Unit Test', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionsCommentsRepository = new InMemoryQuestionsCommentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    sut = new CommentOnQuestionUseCase(
      questionsRepository,
      questionsCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await questionsRepository.create(question)

    await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content: 'Conteúdo teste',
    })

    expect(questionsCommentsRepository.items[0].content).toEqual(
      'Conteúdo teste',
    )
  })
})
