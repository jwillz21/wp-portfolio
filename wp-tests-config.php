<?php
/**
 * WordPress test configuration.
 *
 * Override values via environment variables when needed.
 */

function wp_tests_env( $key, $default ) {
    $value = getenv( $key );
    if ( false === $value || '' === $value ) {
        return $default;
    }

    return $value;
}

// Database settings.
define( 'DB_NAME', wp_tests_env( 'WP_TEST_DB_NAME', 'wordpress_test' ) );
define( 'DB_USER', wp_tests_env( 'WP_TEST_DB_USER', 'root' ) );
define( 'DB_PASSWORD', wp_tests_env( 'WP_TEST_DB_PASSWORD', 'password' ) );
define( 'DB_HOST', wp_tests_env( 'WP_TEST_DB_HOST', '127.0.0.1' ) );
$table_prefix = wp_tests_env( 'WP_TEST_TABLE_PREFIX', 'wptests_' );

// Site info for tests.
define( 'WP_TESTS_DOMAIN', wp_tests_env( 'WP_TESTS_DOMAIN', 'portfolio.tests' ) );
define( 'WP_TESTS_EMAIL', wp_tests_env( 'WP_TESTS_EMAIL', 'portfolio@builtbyjermaye.com' ) );
define( 'WP_TESTS_TITLE', wp_tests_env( 'WP_TESTS_TITLE', 'Portfolio Test Suite' ) );

// PHP CLI binary.
define( 'WP_PHP_BINARY', wp_tests_env( 'WP_PHP_BINARY', trim( shell_exec( 'which php' ) ) ) );

// Path to WordPress core.
$core_dir = wp_tests_env( 'WP_CORE_DIR', '' );
if ( '' === $core_dir ) {
    // Local fallback if WordPress core is downloaded in this project.
    $core_dir = __DIR__ . '/wordpress';
}
$core_dir = rtrim( $core_dir, '/\\' ) . '/';

if ( ! file_exists( $core_dir . 'wp-settings.php' ) ) {
    fwrite(
        STDERR,
        "WP tests could not find WordPress core. Set WP_CORE_DIR to a directory containing wp-settings.php.\nCurrent path: {$core_dir}\n"
    );
    exit( 1 );
}

if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', $core_dir );
}