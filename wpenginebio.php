<?php
/**
 * Plugin Name:       WP Engine Bio Block
 * Description:       Dynamic block to display user data from WordPress REST API.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.2.1
 * Author:            Software Engineer II candidate for WP Engine
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wpenginebio
 *
 * @package           wpenginebio
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 
function wpenginebio_wpenginebio_block_init() {
	register_block_type( __DIR__ . '/build' );
	
	// Expose email in REST API users endpoint
	register_rest_field( 'user', 'user_email',
	array(
	'get_callback'    => function ( $user ) {
		return get_userdata($user['id'])->user_email;
	},
	'update_callback' => null,
	'schema'          => null,
	)
);
}
add_action( 'init', 'wpenginebio_wpenginebio_block_init' );
