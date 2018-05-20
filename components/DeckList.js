import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import DeckSummary from './DeckSummary'

import { QUESTIONS_KEY, _DATA } from '../utils/api'

class DeckList extends Component{
  componentDidMount(){
    const { receiveDecks } = this.props
    AsyncStorage.setItem(QUESTIONS_KEY, JSON.stringify(_DATA))
      .then(() => {
        getDecks().then(receiveDecks)
      })
  }

  _pressDeckContainer = (item) => {
    const { navigation } = this.props
    navigation.navigate(
      'DeckDetail',
      { deckId: item.key, deckName: item.title }
    )
  }

  _renderItem = ({item}) => {
    return(
      <TouchableOpacity onPress={()=>this._pressDeckContainer(item)}>
        <DeckSummary deck={item} />
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => item.key

  render(){
    const { decks } = this.props

    if(decks){
      return(
        <View style={styles.container} >
          <FlatList
            data={decks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem} />
        </View>
      )
    }else{
      return null
    }
  }
}

function mapDispatchToProps(dispatch){
    return {
      receiveDecks: (decks) => dispatch(receiveDecks(decks))
    }
}

function mapStateToProps({decks}){
  const newDecks = Object.keys(decks).map((key)=>{
      const deck = decks[key]
      deck.key = key
      return deck
  })

  return {
    decks: Object.values(newDecks)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
