import React, { useEffect, useState } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { connect } from 'react-redux';

//Components
import Loader from '../layout/Loader';
import Product from './Product';

//Queries
import { getProductsAndCartItems } from '../../queries/queries.products';
import { addItemToCart } from '../../queries/queries.cart';

const ProductFeed = props => {
    const { userId, addItemToCart } = props;
    return (
        <div className="product-feed">
            <Query query={getProductsAndCartItems} variables={{ userId: userId }}>
                    {({ loading, error, data, refetch }) => {
                        if(loading) return <Loader/>
                        const addToCart = async itemId => {
                            if(userId){
                                const data = await addItemToCart({ variables: { userId, itemId } });
                                refetch();
                            }
                            else props.history.push('/login');
                        }
                        return data.Products.map(product => {
                            return <Product 
                                key={product.id} 
                                data={product} 
                                addToCart={addToCart}
                                inCart={data.User ? Boolean(data.User.cartItems.find(item => item.id === product.id)) : false}
                                refetch={refetch}
                            />
                        });              
                    }}
                </Query>
        </div>
    );
};

const mapStateToProps = state => ({
    userId: state.auth.userInfo.id,
});

const queries = [
    graphql(getProductsAndCartItems, { name: 'getProductsAndCartItems' }),
    graphql(addItemToCart, { name: 'addItemToCart' })
]

export default connect(mapStateToProps)
(compose(...queries)(ProductFeed));