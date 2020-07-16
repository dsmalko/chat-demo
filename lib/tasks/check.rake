desc "Check everything"
task :check => 'check:all'

namespace :check do
  desc "Check CarrierWave upload"
  task upload: :environment do
    u = UserAvatarUploader.new
    u.store!(File.open('spec/test.jpg'))
    u.remove!
    puts "Check CarrierWave upload: OK"
  end

  task :all => [:upload]
end
