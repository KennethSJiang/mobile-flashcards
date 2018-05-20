import React, {Component} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { gray, lightGray, white } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions/decks'

class NewCard extends Component {
  state = {
      question: '',
      answer: ''
  }
  
  _submit = ()=>{
    const { deckId, addCard, goBack } = this.props
    const {question, answer} = this.state
    addCardToDeck(deckId, {question, answer})
      .then(()=> {
        addCard(deckId, {question, answer})
        goBack()
      })
  }

  render(){
    return(
      <View>
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          placeholder='Type your question here'
          placeholderTextColor={gray}
        />
        <TextInput
          style={[styles.textInputContainer, {marginTop: 30}]}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
          placeholder='Type your answer here'
          placeholderTextColor={gray}
        />
        <TextButton style={styles.textBtn} onPress={()=>this._submit()}>
          Submit
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
})

function mapStateToProps({ decks }, {navigation}){
  const { deckId } = navigation.state.params
  return {
    deckId,
  }
}

function mapDispatchToProps(dispatch, {navigation}){
  return{
    addCard: (deckId, card) => dispatch(addCard(deckId, card)),
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)
