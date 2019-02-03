import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {Page} from './components';
import history from './history';
import store from './store';
import theme from './styles/theme';

export default props => {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store} {...props}>
                <Router history={history}>
                    <Route path='/' component={Page}/>
                </Router>
            </Provider>
        </MuiThemeProvider>
    );
};
