import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import AuthContext from '../../auth/index';
import { getTotalDistributorsCount } from '../../database/methods';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';

class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      totalDistributorsCount: 0,
    };
    this.handleDistributorTilePress =
      this.handleDistributorTilePress.bind(this);
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
            <TouchableOpacity
              style={[styles.tile, styles.tileButton]}
              onPress={() => this.handleDistributorTilePress()}>
              <Text style={styles.bold}>Create Distributor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tile, styles.tileButton]}
              onPress={() => this.handleDistributorTilePress()}>
              <Text style={styles.bold}>List Distributors</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tileGroup}>
            <View style={styles.tile}>
              <Text>Total Distributors</Text>
              <Text style={styles.blockButtonText}>
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
  ...commonStyles,
  tile: {
    margin: 10,
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  tileButton: {
    backgroundColor: colors.SECONDARY,
    borderRadius: 5,
  },
  tileGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Dashboard;
