# frozen_string_literal: true

module LoginHelpers
  def login_with(user)
    visit root_path
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Log In'

    expect(page).to have_link 'Log out'
  end
end
