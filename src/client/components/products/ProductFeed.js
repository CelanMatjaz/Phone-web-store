import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

//Components
import Loader from '../layout/Loader';
import Message from '../layout/Message';
import Product from './Product';

//Queries
import { getProducts } from '../../queries/queries.products';
import { addItemToCart } from '../../queries/queries.cart';

const ProductFeed = props => {
    const { Products, error, loading } = props.getProducts;
    const { isEmpty, userId } = props;

    if(loading) return <Loader/>
    if(error) return <Message type="danger" message={error}/>

    const addToCart = async itemId => {
        if(isEmpty) props.history.push('/login');
        else {
            props.addItemToCart({
                variables: {
                    itemId,
                    userId
                }
            });
        }
    }

    return (
        <div className="product-feed">
            {Products && Products.map(product => <Product key={product.id} data={product} addToCart={addToCart}/>)}
        </div>
    );
};

const mapStateToProps = state => ({
    isEmpty: state.auth.isEmpty,
    userId: state.auth.userInfo.id
});

const queries = [
    graphql(getProducts, { name: 'getProducts' }),
    graphql(addItemToCart, { name: 'addItemToCart' }),
]

export default connect(mapStateToProps)
(compose(...queries)(ProductFeed));