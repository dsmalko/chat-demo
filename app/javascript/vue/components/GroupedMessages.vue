<template>
  <div class="chat-messages" ref="messages">
    <div class="chat-message-group" v-for="messageGroup in messageGroups">
      <div class="chat-message" v-for="message in messageGroup.messages">
        <div class="chat-message-gutter">
          <img v-if="message == messageGroup.messages[0]" :src="messageGroup.user.avatar_thumb_url" alt="" class="chat-message-avatar" width="36" height="36">
        </div>
        <div class="chat-message-content">
          <div v-if="message == messageGroup.messages[0]" class="chat-message-content-header">
            <span class="chat-message-user">
              {{message.user.nickname}}
            </span>
            <span class="chat-message-timestamp">
              {{message.created_at | moment('LT')}}
            </span>
          </div>
          <div class="chat-message-content-body">
            {{message.text}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: [
      'messages'
    ],
    computed: {
      messageGroups() {
        return this.messages.reduce((acc, current) => {
          let previous = acc[acc.length - 1] 

          if (previous &&
              previous.user.id == current.user.id &&
              moment.duration(moment(current.created_at).diff(moment(previous.time))).asMinutes() <= 5) {
            acc[acc.length - 1].messages.push(current)

            return [
              ...acc
            ]
          } else {
            return [
              ...acc,
              {
                time: current.created_at,
                user: current.user,
                messages: [current]
              }
            ]
          }
        }, [])
      }
    },
    updated() {
      if (this.$refs.messages) {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      }
    }
  }
</script>