if ENV['CLOUDCUBE_URL']
  require 'carrierwave/storage/fog'

  CarrierWave.configure do |config|
    config.storage = :fog
    config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:     ENV['CLOUDCUBE_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['CLOUDCUBE_SECRET_ACCESS_KEY'],
      region:                'eu-west-1',
      endpoint:              ENV['CLOUDCUBE_URL'],
      path_style: true
    }
    config.fog_directory  = ENV['CLOUDCUBE_URL'].split("/").last
    config.fog_public     = false                                                 # optional, defaults to true
    config.fog_attributes = { cache_control: "public, max-age=#{365.days.to_i}" } # optional, defaults to {}
  end
end
