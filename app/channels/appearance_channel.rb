class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from('users_online')
    current_user.appear
    broadcast_users_online
  end
 
  def unsubscribed
    current_user.disappear
    broadcast_users_online
  end

  private

  def broadcast_users_online
    users = User.online
    data = ActiveModelSerializers::SerializableResource.new(users).serializable_hash
    
    ActionCable.server.broadcast("users_online", data)
  end
end