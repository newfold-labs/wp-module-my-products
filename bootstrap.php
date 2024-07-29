<?php

namespace NewfoldLabs\WP\Module\MyProducts;

use function NewfoldLabs\WP\ModuleLoader\register;

if ( function_exists( 'add_filter' ) ) {
	add_filter(
		'newfold/features/filter/register',
		function ( $features ) {
			return array_merge( $features, array( MyProductsFeature::class ) );
		}
	);
}
