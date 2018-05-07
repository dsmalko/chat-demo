class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat"
    #register_user(current_user)
    #broadcast_users
  end

  def unsubscribed
    #unregister_user(current_user)
    #broadcast_users
  end

  def xxx
    logger.debug "XXXX"
  end

  # private

  def register_user(user)
    ip = 123
    User.find_or_initialize_by(ip: ip).save
  end

  def unregister_user(user)
    ip = 123
    user = User.find_by(ip: ip)
    user.destroy if user
  end

  def broadcast_users
    sleep 0.1
    users = User.all
    ActionCable.server.broadcast("users", users.as_json(only: [:ip]))
  end

  private

  # def current_user
  #   connection.cookies[:ip]
  # end
end