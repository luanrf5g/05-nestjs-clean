import { makeAnswer } from '@/test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachments-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachments-repository'
import {
  CreateNotificationUseCase,
  CreateNotificationUseCaseRequest,
  CreateNotificationUseCaseResponse,
} from '../use-cases/create-notification'
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { MockInstance } from 'vitest'
import { waitFor } from '@/test/utils/wait-for'

let questionsAttachments: InMemoryQuestionAttachmentsRepository
let questionsRepository: InMemoryQuestionsRepository
let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answersRepository: InMemoryAnswersRepository
let notificationsRepository: InMemoryNotificationsRepository
let createNotificationUseCase: CreateNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  (
    request: CreateNotificationUseCaseRequest,
  ) => Promise<CreateNotificationUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    questionsAttachments = new InMemoryQuestionAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(questionsAttachments)
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    notificationsRepository = new InMemoryNotificationsRepository()
    createNotificationUseCase = new CreateNotificationUseCase(
      notificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(createNotificationUseCase, 'execute')

    new OnAnswerCreated(questionsRepository, createNotificationUseCase)
  })

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    questionsRepository.create(question)
    answersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
