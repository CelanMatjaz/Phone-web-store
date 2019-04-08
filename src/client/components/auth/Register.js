import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import RegisterP from './RegisterP';

//Queries
import { registerMutation } from '../../queries/queries.auth';

const Register = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
    const handleSubmit = async event => {
        event.preventDefault();
        const data = await props.registerMutation({
            variables: {
                email,
                password,
                passwordRepeat
            }
        });
        let { error, message } = data.data.register;
        console.log(error, message);
        setError(error);
        setMessage(message);
    }
    
    if(!props.isEmpty) return <Redirect to="/"/>;	

    return <RegisterP 
        data={{email, password, passwordRepeat}} 
        handleChange={{ setEmail, setPassword, setPasswordRepeat }} 
        handleSubmit={handleSubmit}
        error={error}
        message={message}
    />
}

const mapStateToProps = state => ({
    isEmpty: state.auth.isEmpty,
});

export default connect(mapStateToProps)(graphql(
    registerMutation, { name: 'registerMutation' }
)(Register));
