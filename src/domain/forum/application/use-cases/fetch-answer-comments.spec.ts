import { InMemoryAnswersCommentsRepository } from '@/test/repositories/in-memory-answers-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '@/test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answersCommentsRepository: InMemoryAnswersCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments Unit Test', () => {
  beforeEach(() => {
    answersCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(answersCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await answersCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )

    await answersCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )

    await answersCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await answersCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
