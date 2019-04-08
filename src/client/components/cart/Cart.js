import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

//Components
import Loader from '../layout/Loader';
import CartItem from './CartItem';

//Queries
import {
    getCartItems,
    removeItemFromCart,
    incrementItemInCart,
    decrementItemInCart,
    clearCart
 } from '../../queries/queries.cart';

const Cart = props => {
    const { getCartItems, removeItemFromCart, incrementItemInCart, decrementItemInCart, clearCart, id } = props;
    const { error, loading, User, refetch } = getCartItems;
    useEffect(() => {
        refetch();
    }, [User]);

    if(props.isEmpty) return <Redirect to="/login"/>
    if(loading) return <Loader/>
    if(User.cartItems.length === 0) return <h5>There are no items in your cart</h5>
    return (
        <div className="cart">
            <h3>There is no functionality yet!</h3>
            {User.cartItems.map(item => <CartItem
                refetch={refetch}
                userId={id} 
                key={item.id} 
                data={item} 
                methods={{removeItemFromCart, incrementItemInCart, decrementItemInCart}}/>) || 'You have no items in your cart'}
        </div>
    );
};

const mapStateToProps = state => ({
    isEmpty: state.auth.isEmpty,
    id: state.auth.userInfo.id
});

const queries = [
    graphql(getCartItems, { name: 'getCartItems' }),
    graphql(removeItemFromCart, { name: 'removeItemFromCart' }),
    graphql(incrementItemInCart, { name: 'incrementItemInCart' }),
    graphql(decrementItemInCart, { name: 'decrementItemInCart' }),
    graphql(clearCart, { name: 'clearCart' }),
]

export default connect(mapStateToProps)(compose(...queries)(Cart));