import { InMemoryAnswersCommentsRepository } from '@/test/repositories/in-memory-answers-comments-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachments-repository'

let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answersCommentsRepository: InMemoryAnswersCommentsRepository
let answersRepository: InMemoryAnswersRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer Unit Test', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersCommentsRepository = new InMemoryAnswersCommentsRepository()
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answersCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'Conteúdo teste',
    })

    expect(answersCommentsRepository.items[0].content).toEqual('Conteúdo teste')
  })
})
