import React, { Component } from 'react';

import Router from './router';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>
          Server-side Render Web App
        </h1>
        <Router />
      </div>
    );
  }
}
