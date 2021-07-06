import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';

class AdsShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advertisementImages: [
        {
          coverImageUrl:
            'https://i.pinimg.com/originals/bf/5f/a1/bf5fa1e612d2c8c9b5861aba6d1e1748.jpg',
          adUrl: '',
        },
        {
          coverImageUrl:
            'https://sixads.net/wp-content/uploads/2021/03/best-advertisement-examples-social.png',
          adUrl: '',
        },
      ],
    };
  }

  componentDidMount() {}

  renderItem({ item }) {
    console.log(item);
    return (
      <View style={{ width: Dimensions.get('window').width, height: 100 }}>
        <Image
          style={{ width: '100%', height: 100 }}
          resizeMode="cover"
          source={{ uri: item.coverImageUrl }}
        />
      </View>
    );
  }

  render() {
    const { advertisementImages } = this.state;
    return (
      <SafeAreaView>
        <FlatList
          // scrollEnabled={false}
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
