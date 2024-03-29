import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {placeMovieInGenre} from './reducers/placeMovieInGenre';
import {selectedUserReducer} from './reducers/selectedUserReducer';
import {searchReducer} from './reducers/searchReducer';
import {userProfileReducer} from './reducers/userProfileReducer';
import {profileReducer} from './reducers/profileReducer';
// import {loadingReducer} from './reducers/loadingReducer';
// import {fetchMoviesAction} from '../../actions/fetchMoviesAction';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    auth:authReducer,
    placement:placeMovieInGenre,
    selectedUser: selectedUserReducer,
    search: searchReducer,
    userProfile: userProfileReducer,
    profile: profileReducer
    // loading: loadingReducer
})
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
