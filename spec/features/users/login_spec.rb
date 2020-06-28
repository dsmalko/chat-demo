# frozen_string_literal: true

require 'rails_helper'

describe 'Login' do
  let!(:user) { create(:user) }

  context 'with valid email/password', js: true do
    it 'allows login' do
      visit root_path
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button 'Log In'

      expect(page).to have_link 'Log out'
    end
  end

  context 'with valid email/password', js: true do
    it 'does not allow login' do
      visit root_path
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: 'invalid'
      click_button 'Log In'

      expect(current_path).to eq root_path
      expect(page).to have_content 'Invalid login credentials. Please try again.'
    end
  end
end
