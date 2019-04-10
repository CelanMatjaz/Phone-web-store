import gql from 'graphql-tag';

export const getCartItems = gql`
    query($id: ID!){
        User(id: $id){
            cartItems{
                id
                name
                quantity
                make
                price
                image
                cartQuantity
            }
        }
    }
`;

export const addItemToCart = gql`
    mutation($userId: ID!, $itemId: ID!){
        addItemToCart(userId: $userId, itemId: $itemId){
            error
            message
        }
    }
`;

export const removeItemFromCart = gql`
    mutation($userId: ID!, $itemId: ID!){
        removeItemFromCart(userId: $userId, itemId: $itemId){
            error
            message
        }
    }
`;

export const incrementItemInCart = gql`
    mutation($userId: ID!, $itemId: ID!){
        incrementItemInCart(userId: $userId, itemId: $itemId){
            error
            message
        }
    }
`;

export const decrementItemInCart = gql`
    mutation($userId: ID!, $itemId: ID!){
        decrementItemInCart(userId: $userId, itemId: $itemId){
            error
            message
        }
    }
`;

export const clearCart = gql`
    mutation($userId: ID!){
        clearCart(userId: $userId){
            error
            message
        }
    }
`;