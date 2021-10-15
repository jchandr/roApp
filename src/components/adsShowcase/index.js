import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, Dimensions, Image } from 'react-native';

import { getAds } from '../../database/methods';

class AdsShowcase extends Component {
  constructor(props) {
    super(props);
    this.adsFlatListRef = React.createRef();
    this.state = {
      interval: null,
      time: Date.now(),
      currentAdIndex: -1,
      advertisementImages: [],
    };
  }

  componentDidMount() {
    getAds().then(d => {
      this.setState({
        advertisementImages: d,
      });
    });

    this.state.interval = setInterval(() => {
      const { currentAdIndex, advertisementImages } = this.state;
      var x = currentAdIndex + 1;
      if (x > advertisementImages.length - 1) {
        this.setState({
          currentAdIndex: 0,
        });
        this.adsFlatListRef.current.scrollToIndex({
          index: 0,
          animated: false,
        });
      } else {
        this.setState({
          currentAdIndex: x,
        });
        this.adsFlatListRef.current.scrollToIndex({
          index: x,
          animated: false,
        });
      }
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ width: Dimensions.get('window').width, height: 125 }}>
        <Image
          style={{ width: '100%', height: 125 }}
          resizeMode="stretch"
          source={{ uri: item.coverImage }}
        />
      </View>
    );
  };

  render() {
    const { advertisementImages } = this.state;
    return (
      <SafeAreaView>
        <FlatList
          ref={this.adsFlatListRef}
          horizontal
          data={advertisementImages}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    );
  }
}

export default AdsShowcase;
