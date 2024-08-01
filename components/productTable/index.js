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
		return `${__( 'Auto-renews:', 'wp-module-my-products' )} ${formattedDate}`;
	}
	return `${__( 'Expires:', 'wp-module-my-products' )} ${formattedDate}`;
};

const ProductsTable = ( { methods, constants, productData, ...props } ) => {
	return (
		<div>
			{ ! methods.isJarvis() && constants.text.jarvisText }
			{ methods.isJarvis() &&
				Array.isArray( productData ) &&
				productData.length > 0 && (
					<Table className="wppbh-products-data-section">
						<Table.Head>
							<Table.Row>
								<Table.Header>
									{ __(
										'Products & Services',
										'wp-module-my-products'
									) }
								</Table.Header>
								<Table.Header>
									{ __(
										'Renewal Date',
										'wp-module-my-products'
									) }
								</Table.Header>
								<Table.Header>
									{ __(
										'Renewal Setting',
										'wp-module-my-products'
									) }
								</Table.Header>
							</Table.Row>
						</Table.Head>
						<Table.Body>
							{ productData.map( ( product ) => (
								<Table.Row key={ product.prodId }>
									<Table.Cell>
										{ product.prodName }
									</Table.Cell>
									<Table.Cell>
										{ determineMessage(
											product.autoRenewFlag,
											product.expirationDate
										) }
									</Table.Cell>
									<Table.Cell>
										<a
											href={
												constants.text.renewalCenterUrl
											}
										>
											{ __(
												'Manage Renewal',
												'wp-module-my-products'
											) }
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
