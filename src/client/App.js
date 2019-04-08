import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

//Apollo client
import client from './ApolloClient';
import store from './store/store';

//Components
import AppComponent from './components/AppComponent';

const App = props => {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AppComponent/>
            </ApolloProvider> 	
        </Provider>       
    )
}

export default App;