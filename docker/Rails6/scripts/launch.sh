# scripts/launch.sh
 
bundle exec rake db:migrate
cp -rf /tmp/public/* /Ro6MysNgx/public/
mkdir -p tmp/sockets
mkdir -p tmp/db
mkdir -p tmp/public
mkdir -p tmp/pids
bundle exec puma -C config/puma.rb

