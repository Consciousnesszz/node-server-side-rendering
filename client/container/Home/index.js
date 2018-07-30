import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CHANGE_HOME_STATUS, ASYNC_CHANGE } from '../../store/types/home';

@connect(
  (state) => {
    return {
      stateStatus: state.status,
    };
  }, {
    changeStatus: CHANGE_HOME_STATUS,
    changeAsync: ASYNC_CHANGE,
  })

export default class Home extends Component {
  handleContentChange = () => {
    console.log(this);
    this.changeStatus('home status changed');
  }

  render() {
    const { stateStatus } = this.props;
    return (
      <div>
        <p>
          {stateStatus}
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
