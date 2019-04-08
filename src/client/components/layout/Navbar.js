import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

//Components
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = props => {
    return (
        <nav className="navbar">
            <div className="container">
                <ul className="left">
                    <li><Link to="/">Products</Link></li>
                </ul>
                <ul className="right">
                    {props.isEmpty ? <SignedOutLinks/> : <SignedInLinks/>}
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    isEmpty: state.auth.isEmpty
});

export default withRouter(connect(mapStateToProps)(Navbar));