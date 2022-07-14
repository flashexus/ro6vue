# README

RoR6 & MySQL8.0 構築手順

## Docker Machine起動

## Docker立ち上げ

`docker-compose up -d`

## DBコンテナ認証方式変更

DBコンテナでmysqlクライアント起動
`docker-compose exec db bash`

認証方式変更
`mysql -u root -p ` → `pass`
`ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'pass';`

## Database MySQL 作成

`docker-compose run apl rake db:create`
`docker-compose run apl rake db:migrate`
### Mongo設定 アクセスユーザーの作成
`docker-compose run mongo bash`
`mongo -uroot -p pass`
`use admin`
`db.createUser({user:"mongo", pwd:"pass", roles:["root"]})`


## テスト環境への切り替え

`docker-compose.yml を一部書き換え`

16行目：
```
        command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
        command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -e test -p 3000 -b '0.0.0.0'"
```

20行目：
```
          RAILS_ENV: production
          RAILS_ENV: test
```
## クレデンシャルの編集の仕方
Dockerの場合はエディターがインストールされていないので、都度インストールすること

```
EDITOR="vi" bin/rails credentials:edit --environment production
```

## 設定済みコンポーネント
Rails 
 administrate
 devise
 devise-bootstrap-views

Node
 Vue
 Vuetify
 Vue-Router
 jquery
 jsqr
 leaflet 