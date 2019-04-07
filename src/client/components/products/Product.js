import React from 'react';

const Product = props => {
    const { name, price, quantity, make, image } = props.data;
    return (
        <div className="card-product">
            <h3>{make}</h3>
            <img src={`/${image}.png`} alt={image}/>
            <h4>{name}</h4>
            Quantity: {quantity > 0 ? quantity + ' left' : 'sold out'} <br/>
            Price: 24 x <b>{price}€</b>
            <button className="product-button">Add to cart</button>
        </div>
    );
};

export default Product;