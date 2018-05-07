class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  
  #protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end

  def application_pack_name
    case framework = params[:framework]
    when 'react', 'vue' then
      "application_#{framework}"
    else
      'application_vue'
    end
  end

  helper_method :application_pack_name
end
