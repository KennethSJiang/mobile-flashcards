import React, {Component} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { gray, lightGray, white, red } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions/decks'

class NewCard extends Component {
  state = {
      question: '',
      answer: '',
      error: '',
  }

  _submit = ()=>{
    const { deckId, addCard, goBack } = this.props
    const {question, answer} = this.state
    if(question.trim().length <= 0 || answer.trim().length <= 0 ){
      this.setState({error: 'Question and answer cannot be empty!'})
    } else {
      this.setState({hasError: ''})
      addCardToDeck(deckId, {question, answer})
        .then(()=> {
          addCard(deckId, {question, answer})
          goBack()
        })
    }
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

  render(){
    const { question, answer } = this.state
    return(
      <View>
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(question) => this.setState({question})}
          value={question}
          placeholder='Type your question here'
          placeholderTextColor={gray}
        />
        <TextInput
          style={[styles.textInputContainer, {marginTop: 30}]}
          onChangeText={(answer) => this.setState({answer})}
          value={answer}
          placeholder='Type your answer here'
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
  textInputContainer: {
    height: 50,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    padding: 5
  },
  errorContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
  errorText: {
    color: red,
    fontSize: 20,
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
