# README

RoR6 & MySQL8.0 構築手順

## Docker Machine起動

settings.json

↓の部分を一旦コメントアウトし、ターミナルでbashが起動されることを確認して、
コメントアウトを外す.コメントアウト外すした状態でターミナルを再度起動し、
Docker Machineが起動するこを確認する

```

{
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  <!--コメントアウト "terminal.integrated.shellArgs.windows": " --login -i \"C:\\Program Files\\Docker Toolbox\\start.sh\"", -->
  "workbench.editor.enablePreview": false
}

```

## Docker立ち上げ

`docker-compose up -d`

### bundleがなくてrailsが立ち上がらない場合：
`docker-compose run apl ./bin/bundle`

## DBコンテナ認証方式変更

DBコンテナでmysqlクライアント起動
`docker-compose exec db bash`

認証方式変更
`mysql -u root -p ` → `pass`
`ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'pass';`

## Database 作成

`docker-compose run apl rake db:create`

## 接続確認

`docker-machine ip`

http://192.168.x.x:3000 ⇒ サイト表示OK
http://192.168.x.x ⇒ サイト表示OK

## アプリの構成を変える場合

一部の変更のみの場合：
`docker-compose up --build`

全体を再構築する場合：
`docker-compose run apl bundle install`
`docker-compose up --build`

## ngrokデプロイコマンド

```

ngrok http http://192.168.99.100:3000

```

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