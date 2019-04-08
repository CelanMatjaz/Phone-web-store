import React from 'react';
import { connect } from 'react-redux';
import { NavLink as Link, withRouter } from 'react-router-dom';

//Action creators
import { logout } from '../../store/constants/constants.auth';

const SignedInLinks = props => {
    return (
        <>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><a onClick={e => {
                e.preventDefault();
                props.logout();
            }} href="/logout">Logout</a></li>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default withRouter(connect(null, mapDispatchToProps)(SignedInLinks));