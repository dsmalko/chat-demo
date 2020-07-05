# frozen_string_literal: true

class UserAvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick

  version :thumb do
    process resize_to_fill: [36, 36]
  end

  version :medium do
    process resize_to_fill: [300, 300]
  end

  def default_url(*_args)
    '/assets/avatar.png'
  end

  def extension_whitelist
    %w[jpg jpeg png gif]
  end

  def content_type_whitelist
    [%r{image/}]
  end

  def size_range
    0..1.megabyte
  end
end
