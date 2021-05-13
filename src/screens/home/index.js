import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, RefreshControl } from 'react-native';
import { DataTable } from 'react-native-paper';

import AuthContext from '../../auth/index';
import { getCustomers } from '../../database/methods';

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
  }

  componentDidMount() {
    this.setDatatableData();
  }

  setDatatableData() {
    this.setState({
      isRefreshing: true,
    });
    var tempDataTableValues = [];
    getCustomers(10, 1).then(val => {
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

  render() {
    const { customerData, isRefreshing } = this.state;

    return (
      <SafeAreaView>
        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Model</DataTable.Title>
              <DataTable.Title>Mobile</DataTable.Title>
            </DataTable.Header>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={() => this.setDatatableData()}
                />
              }>
              {customerData.map((data, i) => {
                return (
                  <DataTable.Row key={i}>
                    <DataTable.Cell>{data.fullName}</DataTable.Cell>
                    <DataTable.Cell>{data.model}</DataTable.Cell>
                    <DataTable.Cell>{data.mobile}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>

            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={page => {
                console.log(page);
              }}
              label="1-2 of 6"
            />
          </DataTable>
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
