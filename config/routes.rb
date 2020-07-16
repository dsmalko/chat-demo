# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    sessions: 'auth/sessions'
  }

  resources :messages, only: %i[index create]
  resource :profile, only: %i[show update]

  root to: 'home#index'
end
