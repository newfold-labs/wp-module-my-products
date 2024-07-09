import { Table } from '@newfold/ui-component-library';

const formatDate = ( dateString ) => {
	if ( typeof dateString !== 'string' ) {
		return '';
	}

	const date = new Date( dateString );
	// Check if the date is valid
	if ( isNaN( date.getTime() ) ) {
		return '';
	}

	const month = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
	const day = date.getDate().toString().padStart( 2, '0' );
	const year = date.getFullYear();

	return `${ month }/${ day }/${ year }`;
};

const determineMessage = ( autoRenewFlag, expirationDate ) => {
	const formattedDate = formatDate( expirationDate );
	if ( autoRenewFlag === true ) {
		return `${__( 'Auto-renews:', 'wp-plugin-bluehost' )} ${formattedDate}`;
	}
	return `${__( 'Expires:', 'wp-plugin-bluehost' )} ${formattedDate}`;
};

const ProductsTable = ( { methods, constants, ...props } ) => {
    
	const [ productData, setProductData ] = methods.useState( [] );
	const [ isError, setIsError ] = methods.useState( false );
	const [ isErrorMsg, setIsErrorMsg ] = methods.useState( '' );

    /**
	 * on mount load all customer's products
	 */
	useEffect( () => {
		if ( methods.isJarvis() ) {
			methods.apiFetch( {
				url: methods.NewfoldRuntime.createApiUrl( '/newfold-my-products/v1/products' ),
				method: 'POST',
			} )
				.then( ( response ) => {
					if ( ! response ) {
						throw new Error( constants.text.error );
					}
					if ( Array.isArray( response ) && response.length === 0 ) {
						throw new Error( 'Empty array' );
					}
					setProductData( response );
				} )
				.catch( ( error ) => {
					setIsError( true );
					if ( error.message === 'Empty array' ) {
						setIsErrorMsg( constants.text.noProducts );
					} else {
						setIsErrorMsg( constants.text.error );
					}
					setProductData( [] ); // Or any default value
				} );
		}
	}, [] );
    
	return (
		<div>
			{ isError && isErrorMsg }
			{ ! methods.isJarvis() && ! isError && constants.text.jarvisText }
			{ methods.isJarvis() && ! isError && ( Array.isArray( productData ) && productData.length === 0 ) && (
				<Table className="wppbh-products-data-section">
					<Table.Head>
						<Table.Row>
							<Table.Header>{__( 'Products & Services', 'wp-plugin-bluehost' )}</Table.Header>
							<Table.Header>{__( 'Renewal Date', 'wp-plugin-bluehost' )}</Table.Header>
							<Table.Header>{__( 'Renewal Setting', 'wp-plugin-bluehost' )}</Table.Header>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						{ productData.map( ( product ) => (
							<Table.Row key={ product.prodId }>
								<Table.Cell>{ product.prodName }</Table.Cell>
								<Table.Cell>
									{ determineMessage(
										product.autoRenewFlag,
										product.expirationDate
									) }
								</Table.Cell>
								<Table.Cell>
									<a href="https://www.bluehost.com/my-account/renewal-center">
									{__( 'Manage Renewal', 'wp-plugin-bluehost' )}
									</a>
								</Table.Cell>
							</Table.Row>
						) ) }
					</Table.Body>
				</Table>
			) }
		</div>
	);
};

export default ProductsTable;