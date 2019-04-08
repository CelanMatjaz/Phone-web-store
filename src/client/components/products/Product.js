import React from 'react';

const Product = props => {
    const { name, price, quantity, make, image, id } = props.data;
    return (
        <div className="card-product">
            <h3>{make}</h3>
            <img src={`/${image}.png`} alt={image}/>
            <h4>{name}</h4>
            Quantity: {quantity > 0 ? quantity + ' left' : 'sold out'} <br/>
            Price: 24 x <b>{price}€</b>
            <button className="product-button" disabled={!quantity >= 1} onClick={() => props.addToCart(id)}>{quantity > 0 ? 'Add to cart' : 'Sold out'}</button>
        </div>
    );
};

export default Product;