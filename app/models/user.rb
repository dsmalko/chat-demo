# frozen_string_literal: true

class User < ApplicationRecord
  scope :online, -> { where(online: true) }

  has_many :messages, dependent: :delete_all

  validates :nickname, presence: true

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  mount_uploader :avatar, UserAvatarUploader

  def appear
    update!(online: true)
  end

  def disappear
    update!(online: false)
  end
end
