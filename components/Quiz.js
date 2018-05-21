import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { red, white, green, gray } from '../utils/colors'
import TextButton from './TextButton'

class Quiz extends Component{
  state = {
    answerCorrect: 0,
    answerWrong: 0,
    currentQIndex: 0,
    showQuestion: true,
  }

  _correctSubmit = ()=>{
    this.setState((prevState) => ({
      currentQIndex: prevState.currentQIndex + 1,
      answerCorrect: prevState.answerCorrect + 1,
      showQuestion: true
    }))
  }

  _incorrectSubmit = ()=>{
    this.setState((prevState) => ({
      currentQIndex: prevState.currentQIndex + 1,
      answerWrong: prevState.answerWrong + 1,
      showQuestion: true
    }))
  }

  _toogleQuestionAnswer = ()=>{
    this.setState((prevState) => ({
      showQuestion: !prevState.showQuestion
    }))
  }

  _goBack = ()=>{
    const { goBack } = this.props
    goBack()
  }

  _questionAnswerText = (question, answer)=>{
    const { showQuestion } = this.state
    if(showQuestion){
      return(
        <Text style={styles.questionText}>
          { question }
        </Text>
      )
    } else {
      return(
        <Text style={styles.answerText}>
          { answer }
        </Text>
      )
    }
  }

  render(){
    const { answerWrong, answerCorrect, currentQIndex, showQuestion } = this.state
    const { deck } = this.props
    const { questions } = deck

    if(currentQIndex === questions.length){
      return(
        <View style={styles.container}>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              Your Score:
            </Text>
            <Text style={[styles.answerText, {fontSize: 50}]}>
              {questions.length === 0 ? 0 : (answerCorrect/questions.length * 100).toFixed(0)}%
            </Text>
            <Text style={[styles.answerText, {color: green, marginTop: 20}]}>
              Correct Answer: {answerCorrect}
            </Text>
            <Text style={[styles.answerText, {color: red, marginTop: 20}]}>
              Incorrect Answer: {answerWrong}
            </Text>
          </View>
          <TextButton
            style={[styles.textButton, {width: 200, marginTop: 40}]}
            onPress={() => this._goBack()}
          >
            Back to Home
          </TextButton>
        </View>
      )
    } else {
      const { question, answer } = questions[currentQIndex]
      return(
        <View style={styles.container}>
          <View style={styles.tracker}>
            <Text style={styles.trackerText}>
              {answerWrong + answerCorrect}/{questions ? questions.length : 0}
            </Text>
          </View>
          <View style={styles.question}>
            { this._questionAnswerText(question, answer) }
            <TextButton
              style={styles.questionAnswerToggle}
              onPress={()=> this._toogleQuestionAnswer()}
            >
              { showQuestion ? 'Answer' : 'Question' }
            </TextButton>
          </View>
          <View style={styles.answerAction}>
            <TextButton
              style={[{backgroundColor: green}, styles.answerButton]}
              onPress={()=>this._correctSubmit()}
            >
              Correct
            </TextButton>
            <TextButton
              style={[{backgroundColor: red}, styles.answerButton]}
              onPress={()=>this._incorrectSubmit()}
            >
              Incorrect
            </TextButton>
          </View>
        </View>
      )
    }
  }
}

function mapStateToProps({ decks }, { navigation }){
  const { deckId } = navigation.state.params
  const deck = decks[deckId]
  return{
    deck
  }
}

function mapDispatchToProps(dispatch, { navigation }){
  return{
    goBack: ()=> navigation.goBack()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tracker: {
    alignSelf: 'flex-start',
    margin: 10
  },
  trackerText: {
    fontSize: 20,
  },
  question:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  questionText:{
    fontSize: 35,
    margin: 10,
  },
  answerText: {
    fontSize: 35,
    margin: 10,
    color: gray,
  },
  questionAnswerToggle:{
    fontSize: 20,
    color: red,
    borderWidth: 0,
  },
  answerAction:{
    marginTop: 20
  },
  answerButton: {
    width: 200,
    fontSize: 20,
    marginTop: 10,
    color: white
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
