import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Posts, Post, Page404} from './components';

export default (
    <Switch>
        <Route exact path="/page-404" component={Page404}/>
        <Route exact path="/" component={Posts}/>
        <Route exact path="/:category" component={Posts}/>
        <Route exact path="/:category/:postId" component={Post}/>
        <Route component={Page404}/>
    </Switch>
);