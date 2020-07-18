# frozen_string_literal: true

require 'rails_helper'

describe 'Login', type: :system do
  let!(:user) { create(:user) }

  shared_examples "Login" do |framework|
    context "#{framework} version" do
      context 'with valid credentials', js: true do
        it 'allows login' do
          visit root_path(framework: framework)
          fill_in 'user_email', with: user.email
          fill_in 'user_password', with: user.password
          click_button 'Log in'
          expect(page).to have_link 'Log out'

          # Ensure the session persists across requests
          visit root_path(framework: framework)
          expect(page).to have_link 'Log out'
        end
      end

      context 'with invalid credentials', js: true do
        it 'does not allow login' do
          visit root_path(framework: framework)
          fill_in 'user_email', with: user.email
          fill_in 'user_password', with: 'invalid'
          click_button 'Log in'

          expect(current_path).to eq root_path
          expect(page).to have_content 'Invalid login credentials. Please try again.'
        end
      end
    end
  end

  include_examples "Login", 'react'
  include_examples "Login", 'vue'
end
