import React from 'react';

const Product = props => {
    const { name, price, quantity, make, image, id } = props.data;
    const { inCart, refetch } = props;
    const disabled = !quantity >= 1 || inCart;
    const text = inCart ? 'Already in cart' : quantity > 0 ? 'Add to cart' : 'Sold out';
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
                onClick={ async () => {
                    await props.addToCart({ variables: { itemId: id }});
                    refetch();
                }}
            >{text}</button>
        </div>
    );
};

export default Product;