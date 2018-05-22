import React from 'react'
import DeckList from './DeckList'
import DeckSummary from './DeckSummary'
import DeckDetail from './DeckDetail'
import NewDeck from './NewDeck'
import NewCard from './NewCard'
import Quiz from './Quiz'
import {createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import { white, darkGray, black, purple } from '../utils/colors'
import { StatusBar, Platform, TouchableOpacity } from 'react-native';

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

export default MainNavigator
