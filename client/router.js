import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import routerConf from './routerConf';

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
          {
            routerConf.map((item) => {
              return <Route exact path={item.path} component={item.component} key={item.component} />;
            })
          }
        </Switch>
      </div>
    );
  }
}
