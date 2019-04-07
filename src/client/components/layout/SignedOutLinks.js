import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const SignedOutLinks = props => {
    return (
        <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </>
    );
};

export default SignedOutLinks;