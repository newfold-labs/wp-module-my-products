import { Container } from '@newfold/ui-component-library';
import ProductsTable from '../productTable';

const defaults = {
	text: {
		jarvisText: __( 'Please login to your account manager to see products.', 'wp-module-my-products' ),
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

	const [ productData, setProductData ] = methods.useState( [] );
	const [ isError, setIsError ] = methods.useState( false );
	const [ showSection, setShowSection ] = methods.useState( false );
	const [ errorMsg, setErrorMsg ] = methods.useState( '' );

	/**
	 * on mount load all customer's products
	 */
	useEffect( () => {
		console.log( 'hi' );
		if ( methods.isJarvis() ) {
			methods
				.apiFetch( {
					url: methods.NewfoldRuntime.createApiUrl(
						'/newfold-my-products/v1/products'
					),
					method: 'GET',
				} )
				.then( ( response ) => {
					if ( ! response ) {
						throw new Error();
					}
					setShowSection(true);
					if ( Array.isArray( response ) && response.length === 0 ) {
						throw new Error( 'Empty array' );
					}
					setProductData( response );
				} )
				.catch( ( error ) => {
					setIsError( true );
					if ( error.message === 'Empty array' ) {
						setErrorMsg( constants.text.noProducts );
					}
					setProductData( [] ); // Or any default value
				} );
		}
	}, [] );

	return (
		<>
			{ showSection && (
				<>
					<Container.Header title={ constants.text.title }>
						<p>
							{ constants.text.subTitle }
							<a href={ constants.text.renewalCenterUrl }>
								{ constants.text.renewalText }
							</a>
						</p>
					</Container.Header>
					<Container.Block>
						{ isError && errorMsg }
						{ ! isError && (
							<ProductsTable
								methods={ methods }
								constants={ constants }
								productData={ productData }
								{ ...props }
							/>
						) }
					</Container.Block>
				</>
			) }
		</>
	);
};

export default NewfoldProducts;