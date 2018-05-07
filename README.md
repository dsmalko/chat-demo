# Realtime Group Chat Demo

[DEMO](https://chat-demo-vue.herokuapp.com)

Features:

* Rails backend
* Vue.js frontend
* Token authentication
* Websocket token authentication
* Channels
* Message grouping by sender/time
* User Avatars
* Who's online

Installation:

```
git clone https://github.com/dsmalko/chat-demo-vue
cd chat-demo-vue
rails db:create db:schema:load
rails s -b 0.0.0.0
```

Heroku:

```
heroku config:set S3_ENABLED=1
heroku config:set S3_KEY=key
heroku config:set S3_SECRET=secret
heroku config:set S3_REGION=region
heroku config:set S3_BUCKET=bucket
```