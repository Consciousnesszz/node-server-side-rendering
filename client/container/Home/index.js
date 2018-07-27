import React, { Component } from 'react';

export default class Home extends Component {
  state = {
    content: 'home',
  }

  handleContentChange = () => {
    this.setState({
      content: 'home content changed',
    });
  }

  render() {
    const { content } = this.state;
    return (
      <div onClick={this.handleContentChange.bind(this)}>
        {content}
      </div>
    );
  }
}
