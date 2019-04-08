import gql from 'graphql-tag';

export const getProducts = gql`
    {
        Products{
            id
            name
            quantity
            make
            price
            image
        }
    }
`;

