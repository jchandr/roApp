import React, { Component } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import AuthContext from '../../auth/index';
import { getTotalDistributorsCount } from '../../database/methods';

class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      totalDistributorsCount: 0,
    };
    this.handleDistributorTilePress = this.handleDistributorTilePress.bind(
      this,
    );
  }

  componentDidMount() {
    getTotalDistributorsCount().then(d => {
      console.log(d);
      this.setState({
        totalDistributorsCount: d.distributorsCount,
      });
    });
  }

  handleDistributorTilePress() {
    this.props.navigation.navigate('Distributor Create');
  }

  render() {
    const { totalDistributorsCount } = this.state;
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
              <Text>Total Distributors</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {totalDistributorsCount}
              </Text>
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
