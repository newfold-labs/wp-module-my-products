<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Products\Products;

use function NewfoldLabs\WP\ModuleLoader\register;

if ( function_exists( 'add_action' ) ) {

	add_action(
		'plugins_loaded',
		function () {

			register(
				array(
					'name'     => 'products',
					'label'    => __( 'Products', 'newfold-module-products' ),
					'callback' => function ( Container $container ) {
						new Products( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				)
			);
		}
	);

}
