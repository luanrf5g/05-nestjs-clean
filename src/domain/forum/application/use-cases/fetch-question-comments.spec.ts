import { InMemoryQuestionsCommentsRepository } from '@/test/repositories/in-memory-questions-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from '@/test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionsCommentsRepository: InMemoryQuestionsCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments Unit Test', () => {
  beforeEach(() => {
    questionsCommentsRepository = new InMemoryQuestionsCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(questionsCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    await questionsCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )

    await questionsCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )

    await questionsCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionsCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
