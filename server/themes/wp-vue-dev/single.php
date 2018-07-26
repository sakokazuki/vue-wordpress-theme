<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/assets/favicon.ico"><title><?php the_title(); ?></title>
    <meta name="description" content="description">
    <meta name="keywords" content="keywords">
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1">
    <!-- analytics-->
    <meta property="og:type" content="website">
    <meta property="og:title" content="トップページのタイトル">
    <meta property="og:description" content="トップページのディスクリプション">
    <meta property="og:site_name" content="sitename"><meta property="og:url", content="<?php bloginfo('url'); ?>"></mata>
    <meta property="og:image", content="<?php bloginfo('template_url'); ?>/assets/og.png"></mata>
    <meta property="og:locale" content="ja_JP">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/assets/styles/main.css"><?php wp_head(); ?>
    
    
  </head>
  <body ontouchstart="">
    <div class="wp-content">
      <h1>記事ページ</h1>
      <h2>env: dev</h2>
    </div>
    <div id="app"></div><?php wp_footer(); ?>
  </body>
</html>