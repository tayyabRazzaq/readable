import React from 'react';
import './App.css';
import './index.css';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {Page} from './components';
import history from './history';

import store from './store';

export default props => {
    return (
        <Provider store={store} {...props}>
            <Router history={history}>
                <Route path='/' component={Page}/>
            </Router>
        </Provider>
    );
};
