FROM ruby:2.6.5

ENV PROJECT Ro6MysNgx

RUN apt-get install -y vim
########################################################################
# yarnパッケージ管理ツールをインストール
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn
# Node.jsをインストール
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

#######################################################################
RUN mkdir /Ro6MysNgx
WORKDIR /Ro6MysNgx

COPY Gemfile /Ro6MysNgx/Gemfile
COPY Gemfile.lock /Ro6MysNgx/Gemfile.lock
RUN yarn install --check-files
ADD . /Ro6MysNgx
RUN bundle install 

VOLUME /$PROJECT
# puma.sockを配置するディレクトリを作成
RUN mkdir -p tmp/sockets

RUN mkdir -p /tmp/public && \
    cp -rf /Ro6MysNgx/public/* /tmp/public