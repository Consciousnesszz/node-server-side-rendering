import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Home from './container/Home';
import User from './container/User';
import NoMatch from './container/NoMatch';

export default class Router extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">
            home
            </Link>
          </li>
          <li>
            <Link to="/user">
            user
            </Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}
