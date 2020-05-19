import {createStore, applyMiddleware} from "redux";
import reducers from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const thunkMiddleware = require('redux-thunk').default;

const initialState = {};

const enhancer = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
));

let store = createStore(reducers, initialState, enhancer);

export default store;
