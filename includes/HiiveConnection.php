<?php

namespace NewfoldLabs\WP\Module\Products;

use NewfoldLabs\WP\Module\Data\HiiveConnection as DataModuleHiiveConnection;

/**
 * Class HiiveConnection
 */
class HiiveConnection extends DataModuleHiiveConnection {

	/**
	 * Get products data from the hiive
	 *
	 * @return array|\WP_Error
	 */
	public function get_products() {

		// If for some reason we are not connected, bail out now.
		if ( ! parent::is_connected() ) {
			return new \WP_Error( 'hiive_connection', __( 'This site is not connected to the hiive.' ) );
		}

		$args = array(
			'headers' => array(
				'Content-Type'  => 'applicaton/json',
				'Accept'        => 'applicaton/json',
				'Authorization' => 'Bearer ' . parent::get_auth_token(),
			),
		);

		$request_reponse = wp_remote_get( $this->get_api_url() . '/sites/v1/customer/products', $args );

		if ( 403 === wp_remote_retrieve_response_code( $request_reponse ) ) {
			$body = json_decode( $request_reponse['body'], true );
			if ( 'Invalid token for url' === $body['message'] ) {
				if ( $this->reconnect() ) {
					$this->get_products();
				} else {
					return new \WP_Error( 'hiive_connection', __( 'This site is not connected to the hiive.' ) );
				}
			}
		}

		return $request_reponse;
	}
}
