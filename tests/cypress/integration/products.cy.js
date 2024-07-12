// <reference types="Cypress" />
const productFixtures = require( '../fixtures/products.json' );

describe( 'My Products', function () {
	let NewfoldRuntime;

	before( () => {
		cy.visit(
			'/wp-admin/admin.php?page=' +
				Cypress.env( 'pluginId' ) +
				'#/products'
		);
		cy.window()
			.its( 'NewfoldRuntime' )
			.then( ( data ) => {
				NewfoldRuntime = data;
			} );
		cy.injectAxe();
	} );

	it( 'My Products Exists', () => {
		cy.get( '.wppbh-products' )
			.contains( 'My Products' )
			.scrollIntoView()
			.should( 'be.visible' );
	} );

	it( 'Products Section Renders Correctly', () => {
		cy.intercept(
			'GET',
			'/index.php?rest_route=%2Fnewfold-my-products%2Fv1%2Fproducts&_locale=user',
			productFixtures
		);
		cy.reload();
		// Verify the table contains the correct product data
        cy.get('.wppbh-products-data-section').within(() => {
            cy.contains('Products & Services').should('be.visible');
            cy.contains('Free SSL').should('be.visible');
            cy.contains('SiteLock Lite').should('be.visible');
        });
	} );

	it( 'Products Section Renders Correctly for No products response', () => {
		cy.intercept(
			'GET',
			'/index.php?rest_route=%2Fnewfold-my-products%2Fv1%2Fproducts&_locale=user',
			[]
		);
		cy.reload();
		cy.get( '.wppbh-products' )
			.contains( 'Sorry, no products. Please, try again later.' )
			.scrollIntoView()
			.should( 'be.visible' );
	} );

	it( 'Products Section Renders Correctly for Empty response', () => {
		cy.intercept(
			'GET',
			'/index.php?rest_route=%2Fnewfold-my-products%2Fv1%2Fproducts&_locale=user',
			{}
		);
		cy.reload();
		cy.get( '.wppbh-products' )
			.contains(
				'Oops, there was an error loading products, please try again later.'
			)
			.scrollIntoView()
			.should( 'be.visible' );
	} );
} );