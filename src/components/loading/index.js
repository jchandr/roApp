import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <View
        style={{
          backgroundColor: 'gray',
          zIndex: 1,
          position: 'absolute',
          justifyContent: 'center',
          display: 'flex',
          width: '100%',
          height: '100%',
          opacity: 0.7,
        }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : (
      <></>
    );
  }
}

export default Loading;
