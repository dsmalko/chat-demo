class ProfilesController < ApplicationController
  before_action :authenticate_user!
  
  def show
    render json: current_user
  end
  
  def update
    if current_user.update(user_params)
      render json: current_user
    else
      render json: {errors: current_user.errors.full_messages}, status: 422
    end
  end

  private

  def user_params
    params[:user].permit(:nickname, :avatar)
  end
end
