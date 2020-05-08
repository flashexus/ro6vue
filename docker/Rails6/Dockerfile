FROM ruby:2.6.5

ENV PROJECT Ro6MysNgx

RUN apt-get update -qq && apt-get install -y nodejs
########################################################################
# yarnパッケージ管理ツールをインストール
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y yarn
# Node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
apt-get install nodejs

#######################################################################
RUN mkdir /Ro6MysNgx
WORKDIR /Ro6MysNgx

COPY Gemfile /Ro6MysNgx/Gemfile
COPY Gemfile.lock /Ro6MysNgx/Gemfile.lock
RUN bundle install
RUN yarn install --check-files
COPY . /Ro6MysNgx

VOLUME /$PROJECT
# puma.sockを配置するディレクトリを作成
RUN mkdir -p tmp/sockets

RUN mkdir -p /tmp/public && \
    cp -rf /Ro6MysNgx/public/* /tmp/public