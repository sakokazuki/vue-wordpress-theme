# vue-wordpress-theme

vueでwordpressのテーマを作成するサンプル。
docker + gulp.js

## init

### yarn
`yarn install`

### create docker envfile
`touch server/.env`

example
```
MYSQL_ROOT_PASSWORD=somewordpress
MYSQL_DATABASE=wordpress
MYSQL_USER=wordpress
MYSQL_PASSWORD=wordpress

WORDPRESS_DB_USER=wordpress
WORDPRESS_DB_PASSWORD=wordpress
```


## command
`yarn dev`: docker起動してgulpも起動する  
`yarn down`: docker-compose down  
`yarn up`: docker-compose up  
`yarn restart`: docker落として yarn dev  
`yarn build`: テーマファイルだけビルドする    

## 開発方針
- ininspired by [VueTheme](https://github.com/rtCamp/VueTheme)
- マークアップは必要に応じてphpを使いながら(pugでinlineでべた書きする)する。
- マークアップした要素はz-index, display:none等で隠す。
- #app以下にvue,vuex,vue-routerでいつもどおりサイトを作る。
- vueでwordpressの情報欲しいときはrestで取ってくる。
- カスタムフィールドのrestはデフォルトでは出てこないので増やすときはfunctions.phpに追記する。

## いいところ
- 最初のマークアップだけ適当に済ませればあとはvueで全部作れる。
- wordpressのrestapiだけつかってサイトは別の場所においてvue使えばいいのでは? -> SEO的に気になるのとogの設定とかページ毎にしたいし。あとはSPAの設定をhtaccess(apacheの場合)に書いたりするの面倒なので
あくまでテーマを作成する。
- 主に開発するコードでphpを書かなくて済む。
- wordpressなのでphpしか動かないレンタルサーバーでも運用ができるサイトを作成できる。(nodeが動けばもっと違う構成でつくれるのだが。)

## 悪いところ
- マークアップだけはphpも書いてやらないといけない。
- 速度的にはめちゃ速いというわけではない。
- 開発環境がなんか複雑



## wordpress作成時にすること

- "Custom Post Type UI", "Custom Field Suite"プラグインをインストール
- CPT UIで"news"のカスタム投稿タイプを追加。下部メニュー"REST API で表示"を"True", "REST API ベーススラッグ"を"news", "アーカイブあり"を"True"にスラッグは空欄のまま。
- フィールドグループにnewsを追加、スクショを参考に
- vue-theme-releaseをwp-content/themes以下に追加
- wordpressでwp-vueテーマを有効化
- スクショを参考にフィールドグループにmemberを追加(一回公開ボタンを押さないとループの子に追加できないので注意)
- 固定ページを一度全部削除、memberというページを追加してテンプレートをmemberにして公開
- フィールドグループが反映されるのでよしなに3人分くらいメンバー追加しておく。
- 投稿を全部ゴミ箱に入れる。
- newsも適当に数件追加しておく。
- パーマリンクのカスタム構造を"/%postname%"に

