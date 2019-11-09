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

## 環境セットアップ
- .envファイルつくる
  - データベースのためのパスワードとか書いてあるやつ。README上部のをコピペして困ったことはない

- docker-compose.ymlの"db_data"を任意の名前に変える
  - 他のプロジェクトと重複するとdb上書きされるので

- 起動
  ```
  yarn up
  ```
  - ここでなにか問題があれば何かがうまくいってないので適宜ググる
  - localhost:8888に移動(8000)だとbrowser-syncされない罠がある(proxyしているため)

- 管理画面にログイン
  - wordpressのユーザーとかパスワード決めてログイン(ローカルなのでなんでもよい)

- テーマ設定
  - Appearance->Themesに移動wp-vue-devのテーマに変更

- プラグインアクティベート
  - "Custom Post Type UI": オリジナルの投稿タイプをつくれるようにする
  - "Custom Field Suite": 投稿時にオリジナルのフォームを作成する
  - "Custom Post Type Permalinks": カスタム投稿タイプのパーマリンク設定をする

- ニュース用の投稿タイプ作成
  - CPTUI->Add/Edit Post Typesに移動
  - PostTypeSlug, Plural Label, Singular Labelを全部"news"にする
  - 下部、Has ArchiveをTrue、Show in REST APIをTrue、REST API base Slugを"news"にする
  - 投稿ページはsingle-news.pug, インデックスページはarchive-news.pugで管理している

- Newsのためのフィールドを作成
  - Field Groups->Add Newに移動
  - 画像を参考に
  - タイトルは"news"(なんでもいいけど)
   
  
  - Nameは必ず"ogimage"にする(signle-news.pugで"ogimage"というidで情報を取得しているため)

- パーマリンク設定
  - Setting -> Permalinksに移動
  - Custom Structureにして`/%post_id%/`にする
  - Custom Post Type PermalinksのプラグインがActivateされていると"/news"の設定もでてるはずなので同様に`/%post_id%/`
  - クライアント要望で投稿名のurlがいいとか言われるかもしれないが、その時考える。多分できるけどurlに日本語入るの嫌だ

- newsの記事をつくる
  - news -> Add Newに移動
  - 適当に2,3件作る
  - さっき追加したogImageのフィールドが追加されているか一応確認
  - 1記事くらいog画像追加してみる
  - SaveDraft(下書き)だとパーマリンクがうまく振られないが、Publishするとちゃんとidになる

- memberのフィールドを作成
  - Field Groups->Add Newに移動
  - 画像を参考に
  - タイトルは"member"
  - Add New Field -> Filed Typeに"Loop"を設定、ほかは全部空欄及びデフォルト
  - Updateを押す(そうしないとLoopの子にフィールドを追加できない)
  - Label: 名前, Name: name, FiledType: Text, Validation: true, Notes: メンバーの名前
  - Label: 説明, Name: description, FiledType: Text, Validation: true, Notes: メンバーの説明
  - を追加して、Loopの子にする。これによって複数のフィールドがつくれる

- メンバーページを追加
  - Pagesに移動
  - 既存のものは一回全部消す
  - Add New
  - 編集ページ右側"Page Attributes"のTemplateを"member"に
    - ちなみに新規テンプレートを作成するときはlayoutのmember.pugのように"Template Name"を指定したファイルを作成する
  - タイトルは何でも良いがとりあえずメンバーにするPermalinkのURL Slugは"member"に(最初設定できない場合は一度publishしてから設定)
  - (一度publishしないとtemplateが確定してなくてカスタムフィールドがないかも)
  - カスタムフィールドでAddRowしてメンバーの名前と説明を適当に追加する

- ページ確認
  - newsに移動
    - 一覧に追加したニュースがあるか
  - news記事に移動
    - og画像を設定したニュースでページのソースを確認、追加したogになっているか
  - memberに移動
    - 追加したメンバーの名前と説明が反映されているか
  - コンソールを開いて各ページでリロード、エラーがないか
    - 普通に移動するだけだとvue-routerがよしなにやってくれる
    - リロードするとページがうまく作られていない場合エラーになるかホームの画面になる




## wordpress作成時にすること
本番環境に移行したときにやること

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

