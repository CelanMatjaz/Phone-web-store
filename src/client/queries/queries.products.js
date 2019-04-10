import gql from 'graphql-tag';

export const getProducts = gql`
    query($userId: ID!){
        Products{
            id
            name
            quantity
            make
            price
            image
        }
        User(id: $userId){
            cartItems{
                id
            }
        }
    }
`;

