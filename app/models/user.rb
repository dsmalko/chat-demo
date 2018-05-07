class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable

  include DeviseTokenAuth::Concerns::User
  include UserAvatarUploader::Attachment.new(:avatar)

  scope :online, -> { where(online: true) }

  validates :nickname, presence: true
  #validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  has_many :messages, dependent: :delete_all

  def appear
    update(online: true)
  end

  def disappear
    update(online: false)
  end
end
