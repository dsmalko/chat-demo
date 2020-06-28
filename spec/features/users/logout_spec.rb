# frozen_string_literal: true

require 'rails_helper'

describe 'Logout' do
  let!(:user) { create(:user) }

  before do
    login_with user
  end

  it 'log out', js: true do
    click_on 'Log out'
    expect(page).to_not have_link 'Log out'
  end
end
