import { Route, Switch } from 'react-router-dom'; 

import React from 'react';

//Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductFeed from './components/products/ProductFeed';
import Cart from './components/cart/Cart';

const Routes = props => {
    return (
        <Switch>
            <Route exact path="/" component={ProductFeed}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/cart" component={Cart}/>
        </Switch>
    );
};

export default Routes;