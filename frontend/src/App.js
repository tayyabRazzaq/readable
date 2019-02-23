import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {Page} from './components';
import history from './history';
import store from './store';
import theme from './styles/theme';

export default props => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store} {...props}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Page}/>
                    <Route exact path="/:category" component={Page}/>
                    <Route exact path="/:category/:postId" render={() => <div/>}/>
                </Switch>
            </Router>
        </Provider>
    </MuiThemeProvider>
);
