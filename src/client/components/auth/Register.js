import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import RegisterP from './RegisterP';

const Register = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
    }
    
    if(!props.isEmpty) return <Redirect to="/"/>;	

    return <RegisterP data={{email, password, passwordRepeat}} handleChange={{setEmail, setPassword, setPasswordRepeat}} handleSubmit={handleSubmit}/>
}

const mapStateToProps = state => ({
    isEmpty: state.auth.isEmpty,
});

export default connect(mapStateToProps)(Register);
