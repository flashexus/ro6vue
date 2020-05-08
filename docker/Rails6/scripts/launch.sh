# scripts/launch.sh
 
bundle exec rake db:migrate
cp -rf /tmp/public/* /Ro6MysNgx/public/
mkdir -p tmp/sockets
bundle exec puma -C config/puma.rb

