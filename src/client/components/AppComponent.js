import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

//Routes
import Routes from '../Routes';

//Components
import Navbar from './layout/Navbar';
import Loader from './layout/Loader';

//Queries
import { loginCheck as lc } from '../queries/queries.auth';

//Action creators
import { loginCheckSuccess, loginCheckFailure } from '../store/constants/constants.auth';

const AppComponent = props => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loginCheck();
    }, [])

    const loginCheck = async () => {
        const token = localStorage.getItem('token');
        if(token){
            const data = await props.client.query({
                query: lc,
                variables: {
                    token 
                }
            });
            const newToken = data.data.LoginCheck;
            if(newToken) props.loginCheckSuccess(newToken);
            else props.loginCheckFailure();
        }
        else props.loginCheckFailure();  
        setLoading(false);
    };

    if(loading) return <Loader/>

    return (
        <div>
            <Navbar/>
            <main className="container">
                <Routes/> 
            </main>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    loginCheckSuccess: token => dispatch(loginCheckSuccess(token)),
    loginCheckFailure: () => dispatch(loginCheckFailure())
});

export default connect(null, mapDispatchToProps)(withApollo(AppComponent));