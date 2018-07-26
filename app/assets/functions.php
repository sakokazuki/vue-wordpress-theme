<?php

//remove head parameter
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head');


// --------------
// read scripts
// --------------
function setting_wp_script(){

  wp_enqueue_style('style', get_stylesheet_uri());

  $handle = 'api-script';

  $base_url  = esc_url_raw( home_url() );
  $base_path = rtrim( parse_url( $base_url, PHP_URL_PATH ), '/' );
  $base_path = $base_path ? $base_path . '/' : '/';
  $variablename = '_WP';
  $original_js_path = get_template_directory_uri().'/assets/js/app.js';

  wp_enqueue_script($handle, $original_js_path, array(), '', true);
  wp_localize_script($handle, $variablename, array(
    'root'      => esc_url_raw( rest_url() ),
    'base_url'  => $base_url,
    'base_path' => $base_path,
    'nonce'     => wp_create_nonce( 'wp_rest' ),
  ) );
}

add_action('wp_enqueue_scripts', 'setting_wp_script');
add_filter('excerpt_more', '__return_false');

//extend rest api for custom fields
add_action('rest_api_init', 'extend_rest_api');

function extend_rest_api(){

  register_rest_field('page',
		'custom', //NAME OF THE NEW FIELD TO BE ADDED - you can call this anything
		array(
			'get_callback'    => 'assign_custom_field_page',
			'update_callback' => null,
			'schema'          => null,
			)
  );

  register_rest_field('news',
		'custom', //NAME OF THE NEW FIELD TO BE ADDED - you can call this anything
		array(
			'get_callback'    => 'assign_custom_field_news',
			'update_callback' => null,
			'schema'          => null,
			)
	);
}

function assign_custom_field_page($object, $field_name, $request){
  $id = $object['id'];
  $fileds = get_post_meta($id, '', false);

  $fileds = is_array( $fileds ) ? $fileds : [];

  if($fileds['picture']){
    $pictures = $fileds['picture'];
    if(is_array($pictures)){
      foreach ($pictures as &$value) {
        $value = wp_get_attachment_url($value);
      }
    }
    $fileds['picture'] = $pictures;
  }
  return $fileds;
}

function assign_custom_field_news($object, $field_name, $request){
  $id = $object['id'];
  $fileds = get_post_meta($id, 'ogimage', false);
  return $fileds[0];
}


// 閉じタグ無し
