/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from "redux-promise";
import {BrowserRouter, Route, Switch} from 'react-router-dom';


/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import PostsList from './containers/PostsList';
import PostsShow from './containers/PostsShow';
import PostsUpdate from './containers/PostsUpdate';
import PostsCreate from './containers/PostsCreate';
import NotFoundComponent from './components/NotFound';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/posts/new" component={PostsCreate}/>
                        <Route path="/posts/:id/edit" component={PostsUpdate}/>
                        <Route path="/posts/:id" component={PostsShow}/>
                        <Route path="/" exact component={PostsList}/>
                        <Route component={NotFoundComponent} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
        , document.getElementById('app')
    );
}