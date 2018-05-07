class Message < ApplicationRecord
  scope :ordered, -> { order(id: :asc) } 
  belongs_to :user
end
