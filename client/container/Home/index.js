import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { CHANGE_HOME_STATUS } from '../../store/types/home';
import { asyncInc } from '../../store/action/home';

@connect(
  (state) => {
    return {
      stateStatus: state.home.status,
    };
  },
  (dispatch) => {
    return {
      changeStatus: status => dispatch({ type: CHANGE_HOME_STATUS, payload: status }),
      changeAsync: bindActionCreators(asyncInc, dispatch),
    };
  }
)

export default class Home extends Component {
  handleContentChange = () => {
    const { changeStatus } = this.props;
    changeStatus('home status changed');
  }

  handleContentAsyncChange = () => {
    const { changeStatus, changeAsync } = this.props;
    changeStatus('async changing');
    changeAsync();
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
        <button type="button" onClick={this.handleContentAsyncChange}>
          change home status async
        </button>
      </div>
    );
  }
}
