import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, TouchableOpacity } from 'react-native';
import DeckList from './components/DeckList'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {Constants} from 'expo'
import reducers from './reducers'
import { purple } from './utils/colors'
import DeckSummary from './components/DeckSummary'
import DeckDetail from './components/DeckDetail'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { white, darkGray, black } from './utils/colors'
import {createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {setLocalNotification} from './utils/helpers'

function MyStatusBar({backgroundColor, ...props}){
    return(
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
      </View>
    )
}

const navigationOptions = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmark' size={30} color={tintColor}/>
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  }
}

const tabRenderOptions = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
  }
}

const Tabs = Platform.OS === 'ios' ?
  createBottomTabNavigator(navigationOptions, tabRenderOptions) :
  createMaterialTopTabNavigator(navigationOptions, tabRenderOptions)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 40,
        marginTop: -20,
      },
      headerTitleStyle:{
        fontSize: 20,
        marginBottom: 5,
        alignSelf: 'center',
        textAlign: 'center',
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 40,
        marginTop: -20,
      },
      headerTitleStyle:{
        fontSize: 20,
        marginBottom: 5,
        alignSelf: 'center',
        textAlign: 'center',
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 40,
        marginTop: -20,
      },
      headerTitleStyle:{
        fontSize: 20,
        marginBottom: 5,
        alignSelf: 'center',
        textAlign: 'center',
      }
    }
  }
}, navigationOptions:{
  header: null
})

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
