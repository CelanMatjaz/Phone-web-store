import React from 'react';
import { ApolloProvider } from 'react-apollo';

//Routes
import Routes from './Routes';

//Apollo client
import { client } from './ApolloClient';

//Components
import Navbar from './components/layout/Navbar';

const App = props => {    
    return (
        <ApolloProvider client={client}>
            <div>
                <Navbar/>
                <main className="container">
                    <Routes/> 
                </main>
            </div>
        </ApolloProvider>        
    )
}

export default App;