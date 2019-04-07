import React from 'react';
import { graphql } from 'react-apollo';

//Components
import Loader from '../layout/Loader';
import Message from '../layout/Message';
import Product from './Product';

//Queries
import { getProducts } from '../../queries/queries.products';

const ProductFeed = props => {
    const { Products, error, loading } = props.getProducts;

    if(loading) return <Loader/>
    if(error) return <Message type="danger" message={error}/>

    return (
        <div className="product-feed">
            {Products && Products.map(product => <Product key={product.id} data={product}/>)}
        </div>
    );
};

export default graphql(
    getProducts, { name: 'getProducts' }
)(ProductFeed);