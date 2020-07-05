# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :email, :nickname, :avatar_thumb_url, :avatar_medium_url

  def avatar_thumb_url
    object.avatar.url(:thumb)
  end

  def avatar_medium_url
    object.avatar.url(:medium)
  end
end
