import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { gray, white, darkGray, lightGray } from '../utils/colors'

const DeckSummary = ({deck}) => {
  console.log("Rendering deck summary")
  return (
    <View style={styles.container}>
      <Text style={styles.deckTitle}>
        {deck.title}
      </Text>
      <Text style={styles.deckDetail}>
        {deck.questions.length} cards
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 6,
    height: 200,
    backgroundColor: lightGray,
    borderColor: gray,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset:{
      width: 0,
      height: 3
    }
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
  }
})

export default DeckSummary
