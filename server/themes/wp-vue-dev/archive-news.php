<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/assets/favicon.ico">
    <title>ニュース一覧ページ</title>
    <meta name="description" content="description">
    <meta name="keywords" content="keywords">
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1">
    <!-- analytics-->
    <meta property="og:type" content="website">
    <meta property="og:title" content="ニュース一覧ページ">
    <meta property="og:description" content="ニュース一覧ページのディスクリプション">
    <meta property="og:site_name" content="sitename"><meta property="og:url", content="<?php bloginfo('url'); ?>/news"></mata>
    <meta property="og:image", content="<?php bloginfo('template_url'); ?>/assets/og.png"></mata>
    <meta property="og:locale" content="ja_JP">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/assets/styles/main.css"><?php wp_head(); ?>
    
    
  </head>
  <body ontouchstart="">
    <div class="wp-content">
      <h1>NEWS</h1><?php $post_list = get_posts( array('post_type' => 'news', 'posts_per_page' => 10) ); ?>
      
      <ul>
      <?php foreach ( $post_list as $line ) : setup_postdata($line); ?>
        <li class="news">
          <h3><a href="<?php bloginfo('url'); ?>/news/<?php echo($line->post_name) ?>"><?php echo($line->post_title) ?></a></h3>
          <?php the_content(); ?>
        </li>
      
      <?php endforeach; ?>
      </ul>
    </div>
    <div id="app"></div><?php wp_footer(); ?>
  </body>
</html>