import React, { Component } from 'react';
import { connect } from 'redux';

import { CHANGE_HOME_STATUS, ASYNC_CHANGE } from "../../store/types/home";

@connect({
  stateStatus(state) {
    return state.status;
  },
}, {
  changeStatus: CHANGE_HOME_STATUS,
  changeAsync: ASYNC_CHANGE,
})

export default class Home extends Component {
  handleContentChange = () => {
    this.changeStatus('home status changed');
  }

  render() {
    return (
      <div>
        <p>
          {this.stateStatus}
        </p>
        <button type="button" onClick={this.handleContentChange}>
          change home status
        </button>
        <button type="button" onClick={this.handleContentChange}>
          change home status async
        </button>
      </div>
    );
  }
}
