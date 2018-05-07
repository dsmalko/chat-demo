Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    sessions: 'auth/sessions'
  }

  resources :messages, only: [:index, :create]
  resource :profile, only: [:show, :update]
  
  root to: 'home#index'
end
