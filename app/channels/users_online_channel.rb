class UsersOnlineChannel < ApplicationCable::Channel
  def subscribed
    stream_from "users_online"
    current_user.become_online
    broadcast
  end

  def unsubscribed
    current_user.become_offline
    broadcast
  end

  private

  def broadcast
    sleep 0.1
    ActionCable.server.broadcast("users_online", ActionCable.server.connections.length)
  end
end