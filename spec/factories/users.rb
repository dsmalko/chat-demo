# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:nickname) { |n| "person#{n}" }
    sequence(:email) { |n| "person#{n}@example.com" }
    password { '12345678' }
  end
end
