<?php
/**
 * Plugin Name: Custom Blocks
 * Description: Reusable Gutenberg blocks library.
 * Version: 1.0
 * Author: Jermayne Williams
 */

defined('ABSPATH') || exit;

function custom_blocks_enqueue_global_assets() {
    $assets_path = plugin_dir_path(__FILE__) . 'assets/';

    foreach (glob($assets_path . '*.css') as $file) {
        $filename = basename($file);
        $handle = 'custom-blocks-' . str_replace('.css', '', $filename);

        wp_register_style(
            $handle,
            plugins_url('assets/' . $filename, __FILE__),
            array('child-understrap-styles'), //add theme dependency to ensure the styles are loaded after the theme styles
            filemtime($file)
        );

        wp_enqueue_style($handle);
    }
}
add_action('enqueue_block_assets', 'custom_blocks_enqueue_global_assets', 20);



function custom_blocks_register_recursive($dir) {

    foreach (glob($dir . '/*', GLOB_ONLYDIR) as $folder) {

        if (file_exists("$folder/block.js")) {

            $block_slug = basename($folder);
            $handle = "custom-blocks-$block_slug";

            wp_register_script(
                $handle,
                plugins_url(str_replace(plugin_dir_path(__FILE__), '', "$folder/block.js"), __FILE__),
                array('wp-blocks','wp-element','wp-editor','wp-components','wp-i18n'),
                filemtime("$folder/block.js")
            );

            $style_handle = file_exists("$folder/style.css") ? "$handle-style" : '';
            if ($style_handle) {
                wp_register_style(
                    $style_handle,
                    plugins_url(str_replace(plugin_dir_path(__FILE__), '', "$folder/style.css"), __FILE__),
                    array(),
                    filemtime("$folder/style.css")
                );
            }

            $editor_handle = file_exists("$folder/editor.css") ? "$handle-editor" : '';
            if ($editor_handle) {
                wp_register_style(
                    $editor_handle,
                    plugins_url(str_replace(plugin_dir_path(__FILE__), '', "$folder/editor.css"), __FILE__),
                    array('wp-edit-blocks'),
                    filemtime("$folder/editor.css")
                );
            }

            register_block_type("custom-blocks/$block_slug", array(
                'editor_script' => $handle,
                'style'         => $style_handle,
                'editor_style'  => $editor_handle,
            ));
        }

        custom_blocks_register_recursive($folder);
    }
}

function custom_blocks_init() {
    $blocks_dir = plugin_dir_path(__FILE__) . 'blocks';
    custom_blocks_register_recursive($blocks_dir);
}
add_action('init', 'custom_blocks_init');

//Add custom block category
add_filter('block_categories_all', function($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'custom-blocks',
                'title' => 'Custom Blocks'
            )
        )
    );
});