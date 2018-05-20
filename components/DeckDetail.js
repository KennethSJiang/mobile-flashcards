import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { white, darkGray, gray, lightGray } from '../utils/colors'
import DeckSummary from './DeckSummary'
import TextButton from './TextButton'

class DeckDetail extends Component{
  static navigationOptions = ({navigation}) => {
      const {deckName} = navigation.state.params
      return{
        title: deckName
      }
  }

  _addCard = (deckId) => {
    const {navigation} = this.props
    console.log("_addcard has been called on " + deckId)
    navigation.navigate(
      "NewCard",
      { deckId }
    )
  }

  _startQuiz = (deck) => {
    console.log("_startQuiz has been called on " + deck.key)
  }

  render(){
    const {deck} = this.props
    return(
      <View style={styles.container}>
        <Text style={styles.deckTitle}>
          {deck.title}
        </Text>
        <Text style={styles.deckDetail}>
          {deck.questions.length} cards
        </Text>
        <TextButton style={styles.textButton} onPress={()=>this._addCard(deck.key)}>Add Card</TextButton>
        <TextButton style={[styles.textButton, {backgroundColor: lightGray}]} onPress={()=>this._startQuiz(deck)}>Start Quiz</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: white,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    deckTitle:{
      textAlign: 'center',
      fontSize: 40,
      color: darkGray,
    },
    deckDetail:{
      textAlign: 'center',
      fontSize: 20,
      color: gray,
      marginTop: 30
    },
    textButton:{
      width: 150,
      fontSize: 20,
      marginTop: 20
    }
})

function mapStateToProps({decks}, {navigation}){
  const { deckId, deckName } = navigation.state.params
  return{
    deck: decks[deckId]
  }
}

export default connect(mapStateToProps)(DeckDetail)
