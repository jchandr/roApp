import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, RefreshControl } from 'react-native';
import { DataTable } from 'react-native-paper';

import AuthContext from '../../auth/index';
import { getCustomers } from '../../database/methods';

import styles from '../../styles/screens/home/index';

class Home extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      user: this.context,
      customerData: [],
      isRefreshing: false,
    };

    this.setDatatableData = this.setDatatableData.bind(this);
    this.isCloseToBottom = this.isCloseToBottom.bind(this);
    this.handleDataTableItemClick = this.handleDataTableItemClick.bind(this);
  }

  componentDidMount() {
    this.setDatatableData();
  }

  handleDataTableItemClick(id) {
    this.props.navigation.navigate('Contact Show', { id: id });
  }

  setDatatableData() {
    this.setState({
      isRefreshing: true,
    });
    var tempDataTableValues = [];

    getCustomers(25, 1).then(val => {
      for (var [id, entry] of Object.entries(val)) {
        entry.id = id;
        tempDataTableValues.push(entry);
      }
      this.setState({
        customerData: tempDataTableValues,
        isRefreshing: false,
      });
    });
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  }

  render() {
    const { customerData, isRefreshing } = this.state;

    return (
      <SafeAreaView style={styles.flexContainer}>
        <View style={styles.flexContainer}>
          <DataTable style={styles.flexContainer}>
            <DataTable.Header>
              <DataTable.Title style={styles.nameField}>Name</DataTable.Title>
              <DataTable.Title>Mobile</DataTable.Title>
              <DataTable.Title>Entry Date</DataTable.Title>
            </DataTable.Header>
            <ScrollView
              onScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  console.log('hi');
                }
              }}
              scrollEventThrottle={400}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={() => this.setDatatableData()}
                />
              }>
              {customerData.map((data, i) => {
                return (
                  <DataTable.Row
                    key={i}
                    onPress={() => this.handleDataTableItemClick(data.id)}>
                    <DataTable.Cell style={styles.nameField}>
                      {data.fullName}
                    </DataTable.Cell>
                    <DataTable.Cell>{data.mobile}</DataTable.Cell>
                    <DataTable.Cell>{data.entryDate}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
