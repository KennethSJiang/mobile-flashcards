import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray, red, white, green, lightGray } from '../utils/colors'
import TextButton from './TextButton'

class Score extends Component{
  render(){
    const { answerWrong, answerCorrect, totalQuestions, restart, goBack } = this.props

    return(
      <View style={styles.container}>
        <View style={styles.question}>
          <Text style={styles.questionText}>
            Your Score:
          </Text>
          <Text style={[styles.answerText, {fontSize: 50}]}>
            {totalQuestions === 0 ? 0 : (answerCorrect/totalQuestions * 100).toFixed(0)}%
          </Text>
          <Text style={[styles.answerText, {color: green, marginTop: 20}]}>
            Correct Answer: {answerCorrect}
          </Text>
          <Text style={[styles.answerText, {color: red, marginTop: 20}]}>
            Incorrect Answer: {answerWrong}
          </Text>
        </View>
        <TextButton
          style={[styles.textButton, {width: 200, marginTop: 40, backgroundColor: lightGray}]}
          onPress={restart}
        >
          Restart Quiz
        </TextButton>
        <TextButton
          style={[styles.textButton, {width: 200, marginTop: 10}]}
          onPress={goBack}
        >
          Back to Deck
        </TextButton>
      </View>
    )
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

export default Score
