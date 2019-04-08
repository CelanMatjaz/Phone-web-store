import React from 'react';

const CartItem = ({ 
    data: { image, id, cartQuantity, make, name, price, quantity }, 
    methods: { removeItemFromCart, incrementItemInCart, decrementItemInCart },
    userId, refetch
}) => {

    const handleIncrement = async () => {
        if(cartQuantity < quantity){
            incrementItemInCart({
                variables: {
                    userId,
                    itemId: id
                }
            });
            refetch();
        }
    }

    const handleDecrement = async () => {
        if(cartQuantity > 0){
            decrementItemInCart({
                variables: {
                    userId,
                    itemId: id
                }
            });
            refetch();
        }
    }

    return (
        <div className="cart-item">
            <div><img src={`/${image}.png`}/></div>
            <div>
                <small>{make}</small> {name} <br/>
                Available: {quantity} <br/>

                Price: 24 x <b>{price}€</b> <br/>

                In cart: 
                <button onClick={() => handleIncrement()}>+</button>
                {cartQuantity}
                <button onClick={() => handleDecrement()}>-</button>
            </div>
        </div>
    );
};

export default CartItem;