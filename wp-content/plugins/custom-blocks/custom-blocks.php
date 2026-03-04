<?php
/**
 * Plugin Name: Custom Blocks
 * Description: Reusable Gutenberg blocks library.
 * Version: 1.0
 * Author: Jermayne Williams
 */

defined('ABSPATH') || exit;

/**
 * Enqueue global CSS assets from plugin root /assets folder
 */
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


/**
 * Recursively register blocks from the /blocks directory
 */
function custom_blocks_register_recursive($dir, $namespace = 'custom-blocks') {

    foreach (glob($dir . '/*', GLOB_ONLYDIR) as $folder) {

        $block_slug = basename($folder);

        if (file_exists("$folder/block.js")) {

            $handle = "custom-blocks-$block_slug";
            $default_block_name = "$namespace/$block_slug";

            // If block.js specifies a different block name, register under that name too.
            $block_names = array($default_block_name);
            $js_source = @file_get_contents("$folder/block.js");
            if (is_string($js_source) && preg_match('/registerBlockType\s*\(\s*[\'"]([^\'"]+)[\'"]\s*,/m', $js_source, $m)) {
                $block_names[] = $m[1];
            }
            $block_names = array_values(array_unique(array_filter($block_names)));

            // Register JS
            wp_register_script(
                $handle,
                plugins_url(str_replace(plugin_dir_path(__FILE__), '', "$folder/block.js"), __FILE__),
                array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-data'),
                filemtime("$folder/block.js")
            );

            // Register style.css if exists
            $style_handle = file_exists("$folder/style.css") ? "$handle-style" : '';
            if ($style_handle) {
                wp_register_style(
                    $style_handle,
                    plugins_url(str_replace(plugin_dir_path(__FILE__), '', "$folder/style.css"), __FILE__),
                    array(),
                    filemtime("$folder/style.css")
                );
            }

            // Register editor.css if exists
            $editor_handle = file_exists("$folder/editor.css") ? "$handle-editor" : '';
            if ($editor_handle) {
                wp_register_style(
                    $editor_handle,
                    plugins_url(str_replace(plugin_dir_path(__FILE__), '', "$folder/editor.css"), __FILE__),
                    array('wp-edit-blocks'),
                    filemtime("$folder/editor.css")
                );
            }

            // Dynamic render_callback if render.php exists
            $render_callback = file_exists("$folder/render.php") ? function($attributes, $content = '', $block = null) use ($folder, $block_slug) {
                include_once "$folder/render.php";
                $fn = 'custom_blocks_render_' . str_replace('-', '_', $block_slug);
                if (function_exists($fn)) {
                    return $fn($attributes, $content, $block);
                }
                return '';
            } : null;

            foreach ($block_names as $block_name) {
                register_block_type($block_name, array(
                    'editor_script'   => $handle,
                    'style'           => $style_handle,
                    'editor_style'    => $editor_handle,
                    'render_callback' => $render_callback,
                ));
            }
        }

        // Recurse into subfolders
        custom_blocks_register_recursive($folder, $namespace);
    }
}

/**
 * Initialize blocks
 */
function custom_blocks_init() {
    $blocks_dir = plugin_dir_path(__FILE__) . 'blocks';
    custom_blocks_register_recursive($blocks_dir);
}
add_action('init', 'custom_blocks_init');


/**
 * Add custom block category
 */
add_filter('block_categories_all', function($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'custom-blocks',
                'title' => 'Custom Blocks',
            )
        )
    );
});

function register_projects_cpt() {
    register_post_type('projects', array(
        'label'       => 'Projects',
        'public'      => true,
        'show_in_rest'=> true,
        'supports'    => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'taxonomies'  => array('post_tag'),
    ));
}
add_action('init', 'register_projects_cpt');