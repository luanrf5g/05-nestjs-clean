import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachments-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answers Unit Test', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    sut = new AnswerQuestionUseCase(answersRepository)
  })

  it('should be able to answer an question', async () => {
    const result = await sut.execute({
      instructorId: '1',
      questionId: '2',
      content: 'Nova Resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(answersRepository.items[0]).toEqual(result.value?.answer)
  })
})
