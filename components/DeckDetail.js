import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { white, darkGray, gray, lightGray } from '../utils/colors'
import DeckSummary from './DeckSummary'
import TextButton from './TextButton'

class DeckDetail extends Component{

  //Overwrite navigation header option
  static navigationOptions = ({navigation}) => {
    console.log("KENNETH I got called!")
      const {deck} = navigation.state.params
      return{
        title: deck.title
      }
  }

  _addCard = (deckId) => {
    console.log("_addcard has been called on " + deckId)

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

function mapStateToProps(state, {navigation}){
  const {deck} = navigation.state.params
  return{
    deck
  }
}

export default connect(mapStateToProps)(DeckDetail)
