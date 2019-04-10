import React, { useEffect, useState } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { connect } from 'react-redux';

//Components
import Loader from '../layout/Loader';
import Product from './Product';

//Queries
import { getProducts } from '../../queries/queries.products';
import { addItemToCart } from '../../queries/queries.cart';

const ProductFeed = props => {
    const { userId, addItemToCart } = props;
    return (
        <div className="product-feed">
            <Query query={getProducts} variables={{ userId: userId }}>
                {({ loading, error, data, refetch }) => {
                    if(loading) return <Loader/>
                    const products = data.Products.map(product => {
                        const inCart = data.User.cartItems.find(item => item.id === product.id) ? true : false;
                        return <Product 
                            key={product.id} 
                            data={product} 
                            addToCart={addItemToCart}
                            inCart={inCart}
                            refetch={refetch}
                        />
                    });
                    return products;
                }}
            </Query>
        </div>
    );
};

const mapStateToProps = state => ({
    userId: state.auth.userInfo.id
});

const queries = [
    graphql(getProducts, { name: 'getProducts' }),
    graphql(addItemToCart, { name: 'addItemToCart' })
]

export default connect(mapStateToProps)
(compose(...queries)(ProductFeed));