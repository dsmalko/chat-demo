# frozen_string_literal: true

require 'rails_helper'

describe 'Chat', type: :system do
  shared_examples "Chat" do |framework|
    context "#{framework} version" do
      let!(:user) { create(:user, nickname: 'person1') }
      let!(:another_user) { create(:user, nickname: 'person2') }

      it 'allows live messaging', js: true do
        Capybara.using_session :another_user do
          login_with another_user, framework: framework
        end

        Capybara.using_session :default do
          login_with user, framework: framework
          fill_in 'message_body', with: 'Hey!'
          click_on 'Send'
          expect(page).to have_content 'Hey!'
        end

        Capybara.using_session :another_user do
          expect(page).to have_content 'Hey!'
          fill_in 'message_body', with: 'Hi!'
          click_on 'Send'
          expect(page).to have_content 'Hi!'
        end

        Capybara.using_session :default do
          expect(page).to have_content 'Hi!'
        end
      end

      it 'shows who is online', js: true do
        Capybara.using_session :default do
          login_with user, framework: framework

          within '.sidebar' do
            expect(page).to have_content 'person1'
            expect(page).to_not have_content 'person2'
          end
        end

        Capybara.using_session :another_user do
          login_with another_user, framework: framework

          within '.sidebar' do
            expect(page).to have_content 'person1'
            expect(page).to have_content 'person2'
          end
        end

        Capybara.using_session :default do
          within '.sidebar' do
            expect(page).to have_content 'person1'
            expect(page).to have_content 'person2'
          end

          click_on 'Log out'
        end

        Capybara.using_session :another_user do
          within '.sidebar' do
            expect(page).to_not have_content 'person1'
            expect(page).to have_content 'person2'
          end
        end
      end
    end
  end

  include_examples "Chat", 'react'
  include_examples "Chat", 'vue'
end
