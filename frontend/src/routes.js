import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Posts, Post} from './components';

export default () => (
    <Switch>
        <Route exact path="/" component={Posts}/>
        <Route exact path="/:category" component={Posts}/>
        <Route exact path="/:category/:postId" component={Post}/>
    </Switch>
);