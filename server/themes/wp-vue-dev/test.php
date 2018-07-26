<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>タイトル</title>
    <meta name="description" content="ディスクリプション">
    <meta name="keywords" content="キーワード">
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1">
    <!-- analytics-->
    <meta property="og:type" content="website">
    <meta property="og:title" content="シェアタイトル">
    <meta property="og:description" content="シェアディスクリプション">
    <meta property="og:site_name">
    <meta property="og:url" content="シェアurl">
    <meta property="og:image" content="http://hoge.com/img/ogimg.png">
    <meta property="og:locale" content="ja_JP">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/assets/styles/main.css"><?php wp_head(); ?>
    
    
  </head>
  <body ontouchstart="">
    <?php
      /*
      Template Name: test
      */
    ?>
    
    <h1>テストページ test</h1>
    <h2>env: dev</h2>
    <div id="app"></div><?php wp_footer(); ?>
  </body>
</html>