import React, { Component,useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Platform } from "@unimodules/core";
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      datas: []
    }
  }
  getNews = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe`
    );
    const jsonData = await response.json();
    this.setState({datas: jsonData.articles});
    this.setState({loading: false})
  };
  componentDidMount() {
    this.getNews()
  }
  componentDidUpdate() {
    this.getNews()
  }
  render() {
    const { loading, datas } = this.state
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size='large'
            loading={loading}
          />
        </View>
      )
    }
    return (
      <SafeAreaView style={{
        flex: 2,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}>
        <View style={styles.header}>
          <Text style={styles.label}>
            Articles count:
          </Text>
          <Text style={styles.info}>
            {datas.length}
          </Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={datas}
            renderItem={Item}
            keyExtractor={(item) => item.title}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const Item = ({ item }) => {
  return (
    <Card
      title={item.title}
      image={{ uri: item.urlToImage }}
    >
      <View style={styles.row}>
        <Text style={styles.label}>
          Source
          </Text>
        <Text style={styles.info}>
          {item.source.name}
        </Text>
      </View>
      <Text>{item.content}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>
          Published
          </Text>
        <Text style={styles.info}>
          {item.publishedAt}
        </Text>
      </View>
      <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
    </Card>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    justifyContent: 'center'
  },
  label: {
    fontWeight: 'bold'
  },
  info: {
    fontWeight: '400'
  }
});
