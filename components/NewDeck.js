import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import TextButton from './TextButton'
import { gray, lightGray, red } from '../utils/colors'
import { createNewDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions/decks'

class NewDeck extends Component{
  state={
    deckTitle: '',
    error: '',
  }

  _showError(){
    const { error } = this.state
    return error.length > 0 && (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View>
    )
  }

  _submit(){
    const { deckIds, addNewDeck, toDeckDetail, replaceNavStack } = this.props
    const { deckTitle } = this.state
    const deckId = deckTitle.replace(/\s/g, "_")

    if(deckId.trim().length <= 0){
      this.setState({error: 'Name cannot be empty!'})
    } else if(deckIds.includes(deckId)){
      this.setState({ error: 'Deck has already exist. Choose another name.'})
    } else {
      this.setState({ error: '' })
      createNewDeck(deckId, deckTitle)
        .then(() => {
          addNewDeck(deckId, deckTitle)
          replaceNavStack()
          toDeckDetail(deckId, deckTitle)
        })
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={[styles.textInputContainer, {marginTop: 30}]}
          onChangeText={(deckTitle) => this.setState({deckTitle})}
          value={this.state.answer}
          placeholder='Deck Title'
          placeholderTextColor={gray}
        />
        <TextButton style={styles.textBtn} onPress={()=>this._submit()}>
          Submit
        </TextButton>
        { this._showError() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    marginTop: 40,
    fontSize: 40,
    textAlign: 'center',
  },
  textInputContainer: {
    height: 50,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    padding: 5
  },
  textBtn:{
    width: 150,
    fontSize: 20,
    marginTop: 20,
    backgroundColor: lightGray,
    alignSelf: 'center'
  },
  errorContainer: {
    margin: 10,
    alignSelf: 'center',
  },
  errorText: {
    color: red,
    fontSize: 20,
  },
})

function mapDispatchToProps(dispatch, {navigation}){
  return{
    addNewDeck: (id, title) => dispatch(addDeck(id, title)),
    toDeckDetail: (deckId, deckTitle) => navigation.navigate(
      'DeckDetail',
      { deckId: deckId, deckName: deckTitle }
    ),
    replaceNavStack: () => navigation.replace('Home')
  }
}

function mapStateToProps({ decks }, { navigation }){
  return {
    deckIds: Object.keys(decks)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
