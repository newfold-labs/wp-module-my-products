// <reference types="Cypress" />
const userProductsFixtures = require( '../fixtures/user-products.json' );

describe( 'My Products Section', function () {
	const appClass = '.' + Cypress.env( 'appId' );

	before( () => {
		cy.intercept(
			{
				method: 'GET',
				url: /newfold-my-products(\/|%2F)v1(\/|%2F)product/,
			},
			userProductsFixtures
		).as( 'user_products' );

		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/home'
		);

		cy.injectAxe();
	} );

	it( 'My Products Section Exists', () => {
		cy.get( appClass + '-home' )
			.contains( 'h2', 'My Products' )
			.scrollIntoView()
			.should( 'be.visible' );
	} );

	it( 'My Products Table Renders Correctly', () => {
		cy.get( '.newfold-my-products-table' ).as( 'myProductsTable' );

		cy.get( '@myProductsTable' ).should( 'be.visible' );
		// table header should have 1 row
		cy.get( '@myProductsTable' )
			.find( 'thead' )
			.find( 'tr' )
			.should( 'have.length', 1 );
		// table body should have 2 rows (data from fixture)
		cy.get( '@myProductsTable' )
			.find( 'tbody' )
			.find( 'tr' )
			.should( 'have.length', 3 );
	} );

	it( 'My Products Data Render Correctly in the Table', () => {
		cy.get( '.newfold-my-products-table' )
			.find( 'tbody' )
			.find( 'tr' )
			.as( 'rows' );

		/**
		 * FIRST PRODUCT: Free SSL
		 */
		// product name column: "Free SSL"
		cy.get( '@rows' )
			.first()
			.find( 'td' )
			.first()
			.contains( 'Free SSL' );
		// renewal date column: "Expires: Never"
		cy.get( '@rows' )
			.first()
			.find( 'td' )
			.eq( 1 )
			.contains( 'Expires: Never' );
		// renewal setting link column: "Manage Renewal"
		cy.get( '@rows' )
			.first()
			.find( 'td' )
			.eq( 2 )
			.find( 'a' )
			.contains( 'Manage Renewal' );

		/**
		 * SECOND PRODUCT: SiteLock Lite
		 */
		// product name column: "SiteLock Lite"
		cy.get( '@rows' )
			.eq( 1 )
			.find( 'td' )
			.first()
			.contains( 'SiteLock Lite' );
		// renewal date column: "Expires: 03/26/2035"
		cy.get( '@rows' )
			.eq( 1 )
			.find( 'td' )
			.eq( 1 )
			.contains( 'Expires: 03/26/2035' );
		// renewal setting link column: "Manage Renewal"
		cy.get( '@rows' )
			.eq( 1 )
			.find( 'td' )
			.eq( 2 )
			.find( 'a' )
			.contains( 'Manage Renewal' );

		/**
		 * THIRD PRODUCT: Yoast Premium SEO
		 */
		// product name column: "Yoast Premium SEO"
		cy.get( '@rows' )
			.eq( 2 )
			.find( 'td' )
			.first()
			.contains( 'Yoast Premium SEO' );
		// renewal date column: "Auto-renews: 04/26/2040"
		cy.get( '@rows' )
			.eq( 2 )
			.find( 'td' )
			.eq( 1 )
			.contains( 'Auto-renews: 04/26/2040' );
		// renewal setting link column: "Manage Renewal"
		cy.get( '@rows' )
			.eq( 2 )
			.find( 'td' )
			.eq( 2 )
			.find( 'a' )
			.contains( 'Manage Renewal' );
	} );
} );
