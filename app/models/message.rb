# frozen_string_literal: true

class Message < ApplicationRecord
  scope :ordered, -> { order(id: :asc) }
  belongs_to :user
end
