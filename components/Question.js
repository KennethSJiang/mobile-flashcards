import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray, red, white, green, lightGray } from '../utils/colors'
import TextButton from './TextButton'

function _questionAnswerText(showQuestion, question, answer){
  if(showQuestion){
    return(
      <Text style={styles.questionText}>
        {question}
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

const Question = ({showQuestion, question, answer,
  totalQuestions, totalAnswered, toggleQuestionAnswer,
  correctSubmit, incorrectSubmit}) => {

  return(
    <View style={styles.container}>
      <View style={styles.tracker}>
        <Text style={styles.trackerText}>
          {totalQuestions === 0 ? 0 : totalQuestions - totalAnswered} / {totalQuestions}
        </Text>
      </View>
      <View style={styles.question}>
        { _questionAnswerText(showQuestion, question, answer) }
        <TextButton
          style={styles.questionAnswerToggle}
          onPress={toggleQuestionAnswer}
        >
          { showQuestion ? 'Answer' : 'Question' }
        </TextButton>
      </View>
      <View style={styles.answerAction}>
        <TextButton
          style={[{backgroundColor: green}, styles.answerButton]}
          onPress={correctSubmit}
        >
          Correct
        </TextButton>
        <TextButton
          style={[{backgroundColor: red}, styles.answerButton]}
          onPress={incorrectSubmit}
        >
          Incorrect
        </TextButton>
      </View>
    </View>
)}

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

export default Question
