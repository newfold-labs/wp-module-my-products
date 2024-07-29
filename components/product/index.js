import { Container } from '@newfold/ui-component-library';
import ProductsTable from '../productTable';

const defaults = {
	text: {
		jarvisText: __( 'Please login to your account manager to see products.', 'wp-module-my-products' ),
		error: __( 'Oops, there was an error loading products, please try again later.', 'wp-module-my-products' ),
		noProducts: __( 'Sorry, no products. Please, try again later.', 'wp-module-my-products' ),
	},
};

/**
 * Products Module
 * For use in brand app to display user's products
 *
 * @param {*} props
 * @return
 */
const NewfoldProducts = ( { methods, constants, ...props } ) => {

    // set defaults if not provided
	constants = Object.assign( defaults, constants );
	
    return (
		<>
				<Container.Block>
						<ProductsTable methods={ methods } constants={ constants } { ...props } />
				</Container.Block>
		</>
	);
};

export default NewfoldProducts;