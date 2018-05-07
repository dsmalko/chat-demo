class MessagesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @messages = Message.ordered.includes(:user).limit(500)
    render json: @messages
  end

  def create
    message = current_user.messages.create!(message_params)

    ActionCable.server.broadcast("chat", MessageSerializer.new(message).as_json)

    render json: message
  end

  private

  def message_params
    params[:message].permit(:channel, :text)
  end
end
