import gql from 'graphql-tag';

export const loginMutation = gql`
    mutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            error
            message
        }
    } 
`

export const registerMutation = gql`
    mutation($email: String!, $password: String!, $passwordRepeat: String!){
        register(email: $email, password: $password, passwordRepeat: $passwordRepeat){
            message
            error
        }
    } 
`