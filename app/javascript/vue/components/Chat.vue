<template>
  <div class="layout">
    <Sidebar/>

    <div class="main-content">
      <div class="chat">
        <div class="chat-heading">
          <div class="user-menu float-right">
            <div class="user-menu-avatar">
              <img :src="$auth.user().avatar_thumb_url" alt="My Avatar">
            </div>
            <span class="user-menu-nickname">{{$auth.user().nickname}}</span>
            <router-link to="/profile" class="btn btn-link pull-right">Profile</router-link>
            <a href="#" @click="logout" class="btn btn-link pull-right">Log out</a>
          </div>

          <h5>#{{currentChannel}}</h5>
        </div>
        
        <GroupedMessages :messages="messages" />
        
        <div class="chat-new-message">
          <form @submit.prevent="sendMessage">
            <input
              id="message_body"
              ref="newMessageText"
              autofocus
              autocomplete="off"
              type="text"
              class="form-control"
              placeholder="Message"
              v-model="newMessage.text"
              >
            <button
              type="submit"
              class="btn btn-primary"
              v-bind:disabled="!newMessageIsValid"
              >Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { createConsumer } from 'cable'
  import Sidebar from './Sidebar'
  import GroupedMessages from './GroupedMessages'

  export default {
    components: {
      Sidebar,
      GroupedMessages
    },
    data() {
      return {
        newMessage: {
          text: '',
        },
      }
    },
    computed: {
      ...mapGetters({
        currentChannel: 'currentChannel'
      }),
      messages() {
        return this.$store.getters.messagesByChannel(this.currentChannel)
      },
      newMessageIsValid() {
        return this.newMessage.text.trim().length > 0
      }
    },
    created () {
      if (this.$route.params.channelId) {
        this.$store.dispatch('setCurrentChannel', this.$route.params.channelId)
      }

      this.$store.dispatch('loadMessages')
    },
    mounted() {
      this.subscribeChannels()
    },
    beforeDestroy() {
      this.unsubscribeChannels()
    },
    updated() {
      if (this.$refs.newMessageText) {
        this.$refs.newMessageText.focus()
      }
    },
    watch: {
      '$route.params.channelId': function(id) {
        this.$store.dispatch('setCurrentChannel', id)
      }
    },
    methods: {
      logout() {
        this.$auth.logout()
      },
      sendMessage() {
        this.$store.dispatch('sendMessage', {
          ...this.newMessage,
          user: this.$auth.user(),
          channel: this.currentChannel
        })

        this.newMessage.text = ''
      },
      subscribeChannels() {
        const uid = this.$auth.user().uid
        const [, token, clientId] = this.$auth.token().split(';')
        
        this.consumer = createConsumer({
          uid: uid,
          token: token,
          clientId: clientId
        })

        this.appearanceChannel = this.consumer.subscriptions.create(
          {
            channel: "AppearanceChannel",
          },
          {
            received: (users) => {
              this.$store.dispatch('setUsersOnline', users)
            },
          }
        )

        this.chatChannel = this.consumer.subscriptions.create(
          {
            channel: "ChatChannel"
          },
          {
            received: (message) => {
              if (message.user.id != this.$auth.user().id) {
                this.$store.dispatch('addMessage', {
                  ...message
                })
              }
            },
          }
        )
      },
      unsubscribeChannels() {
        this.appearanceChannel.unsubscribe()
        this.chatChannel.unsubscribe()
      }
    }
  }
</script>
