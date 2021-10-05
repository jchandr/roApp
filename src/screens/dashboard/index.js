import React, { Component } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import AuthContext from '../../auth/index';

class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {};
    this.handleDistributorTilePress = this.handleDistributorTilePress.bind(
      this,
    );
  }

  componentDidMount() {}

  handleDistributorTilePress() {
    this.props.navigation.navigate('Distributor Create');
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.tileGroup}>
            <Button
              mode="contained"
              contentStyle={styles.tile}
              onPress={() => this.handleDistributorTilePress()}
              style={styles.tile}>
              <Text>Distributors</Text>
            </Button>
            <View style={styles.tile}>
              <Text>asdf</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    margin: 10,
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  tileGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Dashboard;
