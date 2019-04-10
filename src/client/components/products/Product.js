import React from 'react';

const Product = props => {
    const { name, price, quantity, make, image, id } = props.data;
    const { inCart } = props;
    const disabled = !quantity >= 1 || inCart;
    const text = inCart ? 'In cart' : quantity > 0 ? 'Add to cart' : 'Sold out';

    return (
        <div className="card-product">
            <h3>{make}</h3>
            <img src={`/${image}.png`} alt={image}/>
            <h4>{name}</h4>
            Quantity: {quantity > 0 ? quantity + ' left' : 'sold out'} <br/>
            Price: 24 x <b>{price}€</b>
            <button 
                className="product-button" 
                disabled={disabled} 
                onClick={() => props.addToCart(id)}
            >{text}</button>
        </div>
    );
};

export default Product;