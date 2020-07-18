# frozen_string_literal: true

require 'rails_helper'

describe 'Signup', type: :system do
  shared_examples "Signup" do |framework|
    context "#{framework} version" do
      let(:new_user) { build_stubbed(:user) }

      context 'with no errors' do
        it 'creates the user', js: true do
          visit root_path(framework: framework)
          click_on 'Signup'
          fill_in 'user_email', with: new_user.email
          fill_in 'user_nickname', with: new_user.nickname
          fill_in 'user_password', with: new_user.password
          click_button 'Signup'

          expect(page).to have_link 'Log out'
        end
      end
    end
  end

  include_examples "Signup", 'react'
  include_examples "Signup", 'vue'
end
