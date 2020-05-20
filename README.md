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

`docker-compose run web bundle exec rails webpacker:install`

## DBコンテナ認証方式変更

DBコンテナでmysqlクライアント起動
`docker-compose exec db bash`

認証方式変更
`mysql -u root`
`ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '';`

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
