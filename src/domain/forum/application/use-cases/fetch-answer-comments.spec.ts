import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '@/test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryStudentsRepository } from '@/test/repositories/in-memory-students-repository'
import { makeStudent } from '@/test/factories/make-student'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let studentsRepository: InMemoryStudentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments Unit Test', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    answerCommentsRepository = new InMemoryAnswerCommentsRepository(
      studentsRepository,
    )
    sut = new FetchAnswerCommentsUseCase(answerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const student = makeStudent({
      name: 'John Doe',
    })

    studentsRepository.items.push(student)

    const comment1 = makeAnswerComment({
      authorId: student.id,
      answerId: new UniqueEntityID('answer-1'),
    })
    const comment2 = makeAnswerComment({
      authorId: student.id,
      answerId: new UniqueEntityID('answer-1'),
    })
    const comment3 = makeAnswerComment({
      authorId: student.id,
      answerId: new UniqueEntityID('answer-1'),
    })

    await answerCommentsRepository.create(comment1)
    await answerCommentsRepository.create(comment2)
    await answerCommentsRepository.create(comment3)

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment3.id,
        }),
      ]),
    )
  })

  it('should be able to fetch paginated answer questions', async () => {
    const student = makeStudent()

    studentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
