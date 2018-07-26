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
    <meta property="og:title" content="トップページのタイトル"><meta property="og:title", content="<?php the_title(); ?>"></mata>
    <meta property="og:description", content="<?php echo mb_substr(strip_tags($post->post_content),0,100) ; ?>"></mata>
    <meta property="og:site_name" content="sitename"><meta property="og:url", content="<?php bloginfo('url'); ?>/news/<?php echo($post->post_name) ?>"></mata>
    
    
    <?php
      $og = get_post_meta($post->ID, 'ogimage', false);
      $og_url = $og[0] != '' ?
        wp_get_attachment_url($og[0]) :
        get_bloginfo('template_url')."/assets/og.png";
    ?>
    <meta property="og:image", content="<?php echo($og_url) ?>"></mata>
    <meta property="og:locale" content="ja_JP">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/assets/styles/main.css"><?php wp_head(); ?>
    
    
  </head>
  <body ontouchstart="">
    <div class="wp-content">
      <?php setup_postdata($post); ?>
      <h1><?php the_title(); ?></h1>
      <?php the_content(); ?>
    </div>
    <div id="app"></div><?php wp_footer(); ?>
  </body>
</html>