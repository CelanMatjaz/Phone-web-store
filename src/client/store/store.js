import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { configureStore } from 'redux-starter-kit';

import logger from 'redux-logger';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, /*logger*/],
    devTools: true
})

export default store;