import { createConsumer as originalCreateConsumer } from '@rails/actioncable'

export function createConsumer({ uid, token, clientId }) {
  const consumer = originalCreateConsumer()
  const url = new URL(consumer.url)

  url.searchParams.set('uid', uid)
  url.searchParams.set('token', token)
  url.searchParams.set('client_id', clientId)

  Object.defineProperty(
      consumer,
      'url',
      {
        get: function() {
          return url.href
        },
      })

  return consumer
}
