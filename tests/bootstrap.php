<?php
require_once dirname(__DIR__) . '/vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php';

$tests_config = dirname(__DIR__) . '/wp-tests-config.php';

if ( ! file_exists( $tests_config ) ) {
    die( "Could not find wp-tests-config.php\n" );
}
require_once $tests_config;

// Path to WP PHPUnit test suite
$_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $_tests_dir ) {
    $_tests_dir = dirname(__DIR__) . '/vendor/wp-phpunit/wp-phpunit';
}

if ( ! defined( 'WP_TESTS_CONFIG_FILE_PATH' ) ) {
    define( 'WP_TESTS_CONFIG_FILE_PATH', dirname(__DIR__) . '/wp-tests-config.php' );
}

require_once $_tests_dir . '/includes/functions.php';

// Load your plugins if needed
function _manually_load_plugin() {
    require dirname(__DIR__) . '/wp-content/plugins/custom-blocks/custom-blocks.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

require $_tests_dir . '/includes/bootstrap.php';
