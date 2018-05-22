import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import { purple } from './utils/colors'
import {setLocalNotification} from './utils/helpers'
import MainNavigator from './components/MainNavigator'
import MyStatusBar from './components/MyStatusBar'

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={styles.container}>
          <MyStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
