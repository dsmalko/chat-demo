# frozen_string_literal: true

module LoginHelpers
  def login_with(user, framework = 'vue')
    visit root_path(framework: framework)
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Log in'

    expect(page).to have_link 'Log out'
  end
end
