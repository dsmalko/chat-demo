class UserAvatarUploader < Shrine
  plugin :processing
  plugin :versions
  plugin :default_url

  Attacher.default_url do |options|
    "/assets/avatar.png"
  end

  process(:store) do |io, context|
    original = io.download
    pipeline = ImageProcessing::MiniMagick.source(original)

    size_medium = pipeline.resize_to_fill!(300, 300)
    size_thumb = pipeline.resize_to_fill!(36, 36)

    original.close!

    { original: io, medium: size_medium, thumb: size_thumb }
  end
end