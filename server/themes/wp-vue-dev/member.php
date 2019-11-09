<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/assets/favicon.ico">
    <title>メンバーページ</title>
    <meta name="description" content="description">
    <meta name="keywords" content="keywords">
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1">
    <!-- analytics-->
    <meta property="og:type" content="website">
    <meta property="og:title" content="メンバーページ">
    <meta property="og:description" content="メンバーページのディスクリプション">
    <meta property="og:site_name" content="sitename"><meta property="og:url", content="<?php bloginfo('url'); ?>/member"></mata>
    <meta property="og:image", content="<?php bloginfo('template_url'); ?>/assets/og.png"></mata>
    <meta property="og:locale" content="ja_JP">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/assets/styles/main.css"><?php wp_head(); ?>
    
    
  </head>
  <body ontouchstart="">
    <?php
      /*
      Template Name: member
      */
    ?>
    
    <div class="wp-content">
      <h1>メンバー</h1><?php setup_postdata($post); ?>
      <?php the_content(); ?>
      <?php $names = get_post_meta($post->ID, 'name', false)?>
      <?php $descriptions = get_post_meta($post->ID, 'description', false)?>
      <?php $descriptions = get_post_meta($post->ID, 'description', false)?>
      <?php $i = 0 ?>
      
      <ul class="members">
      <?php foreach ( $names as $name ):?>
        <li>
        <div class="name"><?php echo($names[$i]) ?></div>
        <div class="description"><?php echo($descriptions[$i]) ?></div>
        </li>
        <?php $i+=1; ?>
      <?php endforeach; ?>
      </ul>
    </div>
    <div id="app"></div><?php wp_footer(); ?>
  </body>
</html>