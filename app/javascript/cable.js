import ActionCable from 'actioncable'

let consumer = null

function createConsumer({uid, token, clientId}) {
  consumer = ActionCable.createConsumer()
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
      }
    })

  return consumer
}

export {createConsumer}