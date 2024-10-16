import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'
import { CreateNotificationUseCase } from './create-notification'

let notificationsRepository: InMemoryNotificationsRepository
let sut: CreateNotificationUseCase

describe('Create Notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    sut = new CreateNotificationUseCase(notificationsRepository)
  })

  it('should be able to create a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da nova notificação',
    })

    expect(result.isRight()).toBe(true)
    expect(notificationsRepository.items[0]).toEqual(result.value?.notification)
  })
})
