# frozen_string_literal: true

require "capybara/rspec"
require "capybara/rails"
require "capybara-screenshot/rspec"

unless ENV['SELENIUM_URL']
  require 'webdrivers'
  require 'webdrivers/chromedriver'
end

Capybara.server = :puma, { Silent: true }

RSpec.configure do |config|
  config.before(:each, type: :system) do
    # Specify the driver (local selenium)
    driven_by ENV['CAPYBARA_DRIVEN_BY']&.to_sym || :selenium, using: :headless_chrome, screen_size: [1920, 1080]

    next unless ENV['SELENIUM_URL']

    # Specify the driver (remote selenium, read: CI)
    driven_by :selenium, using: :chrome, screen_size: [1920, 1080], options: { url: ENV['SELENIUM_URL'] }

    # Make the test app listen to outside requests, for the remote Selenium instance.
    Capybara.server_host = '0.0.0.0'

    # Get the application container's IP
    ip = Socket.ip_address_list.detect(&:ipv4_private?).ip_address

    # Use the IP instead of localhost so Capybara knows where to direct Selenium
    host! "http://#{ip}:#{Capybara.server_port}"
  end
end


Capybara::Screenshot.prune_strategy = :keep_last_run
Capybara::Screenshot.register_driver(:headless_chrome) do |driver, path|
  driver.browser.save_screenshot(path)
end

RSpec.configure do |config|
  config.after(type: :system) do
    if page.driver.browser.manage
      STDERR.puts page.driver.browser.manage.logs.get(:browser)
    end
  end
end
