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
    const { loading, User, refetch } = getCartItems;
    useEffect(() => {
        refetch();
    }, [User]);   

    if(props.isEmpty) return <Redirect to="/login"/>
    if(loading) return <Loader/>

    const clear = async () => {
        await clearCart({
            variables: {
                userId: id
            }
        });
        refetch();
    }    

    const order = async () => {
        
    }

    return (
        <div className="cart">
            {   
                User.cartItems.length === 0 ? 
                <h3>There are no items in your cart</h3> : 
                (
                    <>
                        <button onClick={() => order()}>Place order</button>
                        <button onClick={() => clear()}>Clear cart</button>
                    </>
                )
            }
            {
                User.cartItems.map(item => <CartItem
                refetch={refetch}
                userId={id} 
                key={item.id} 
                data={item} 
                methods={{removeItemFromCart, incrementItemInCart, decrementItemInCart}}/>) || 'You have no items in your cart'
            }
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
    //graphql(placeOrder, { name: 'placeOrder' }),
]

export default connect(mapStateToProps)(compose(...queries)(Cart));