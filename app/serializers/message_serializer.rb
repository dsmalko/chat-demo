class MessageSerializer < ActiveModel::Serializer
  attributes :id, :channel, :text, :created_at

  belongs_to :user
end
