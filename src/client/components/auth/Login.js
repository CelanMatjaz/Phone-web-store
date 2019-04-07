import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

//Components
import LoginP from './LoginP';

//Queries
import { loginMutation } from '../../queries/queries.auth';

//Action creators
import { login } from '../../store/constants/constants.auth';

const Login = props => {
    const [email, setEmail] = useState('123');
    const [password, setPassword] = useState('12345678');
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        const data = await props.loginMutation({
            variables: {
                email: email,
                password: password
            }
        });
        let { error, token } = data.data.login;
        if(error) setError(error);
        if(token){
            props.login(token);
            props.history.push('/');
        }
    }

    console.log(props);
    												
    if(!props.isEmpty) return <Redirect to={'/'}/>;    

    return <LoginP data={{email, password}} handleChange={{setEmail, setPassword}} handleSubmit={handleSubmit} error={error}/>
}

const mapStateToProps = state => ({
    isEmpty: state.auth.isEmpty
});

const mapDispatchToProps = dispatch => ({
    login: token => dispatch(login(token))
})

export default (connect(mapStateToProps, mapDispatchToProps)(graphql(
    loginMutation, { name: 'loginMutation' }
)(Login)));
