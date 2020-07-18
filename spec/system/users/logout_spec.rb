# frozen_string_literal: true

require 'rails_helper'

describe 'Logout', type: :system do
  shared_examples "Logout" do |framework|
    context "#{framework} version" do
      let!(:user) { create(:user) }

      before do
        login_with user, framework: framework
      end

      it 'log out', js: true do
        click_on 'Log out'
        expect(page).to_not have_link 'Log out'
      end
    end
  end

  include_examples "Logout", 'react'
  include_examples "Logout", 'vue'
end
