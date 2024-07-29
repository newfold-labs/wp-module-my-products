<?php

namespace NewfoldLabs\WP\Module\MyProducts;

use function NewfoldLabs\WP\ModuleLoader\register;

if (!defined('ABSPATH')) {
    return;
}

add_filter(
    'newfold/features/filter/register',
    function ( $features ) {
        return array_merge( $features, array( MyProductsFeature::class ) );
    }
);

