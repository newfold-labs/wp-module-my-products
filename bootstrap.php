<?php

namespace NewfoldLabs\WP\Module\MyProducts;

use function NewfoldLabs\WP\ModuleLoader\register;

if (!defined('ABSPATH')) {
    return;
}

// Do not allow multiple copies of the module to be active
if ( defined( 'NFD_DATA_MODULE_MY_PRODUCTS' ) ) {
	return;
}

define( 'NFD_DATA_MODULE_MY_PRODUCTS', '1.0.0' );

add_filter(
    'newfold/features/filter/register',
    function ( $features ) {
        return array_merge( $features, array( MyProductsFeature::class ) );
    }
);

