import React, { Component } from 'react';
import { Text } from 'react-native';
import timeago from 'timeago.js';

class TimeAgo extends Component {

  state = {
    date: new Date()
  }

  componentDidMount() {
    this._timerID = setInterval(this._tick, 20000);
  }

  componentWillUnmount() {
    clearInterval(this._timerID);
  }

  _tick = () => this.setState({
    date: new Date()
  });
  
  render() {
    const { time, style } = this.props;

    const timeString = timeago(this.state.date).format(time);

    return (
      <Text style={style}>{timeString}</Text>
    );
  }
}

export default TimeAgo;