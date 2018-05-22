import React, { Component } from 'react'
import { connect } from 'react-redux'
import Score from './Score'
import Question from './Question'

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

  _toggleQuestionAnswer = ()=>{
    this.setState((prevState) => ({
      showQuestion: !prevState.showQuestion
    }))
  }

  _restart = ()=>{
    this.setState({
      answerCorrect: 0,
      answerWrong: 0,
      currentQIndex: 0,
      showQuestion: true,
    })
  }

  _goBack = ()=>{
    const { goBack } = this.props
    goBack()
  }

  render(){
    const { answerWrong, answerCorrect, currentQIndex, showQuestion } = this.state
    const { deck } = this.props
    const { questions } = deck

    if(currentQIndex === questions.length){
      return(
        <Score
        answerWrong={answerWrong}
        answerCorrect={answerCorrect}
        totalQuestions={questions.length}
        restart={()=>this._restart()}
        goBack={()=>this._goBack()} />
      )
    } else {
      const { question, answer } = questions[currentQIndex]
      const questionPoolSize = questions ? questions.length : 0

      return(
        <Question
          showQuestion={showQuestion}
          question={question}
          answer={answer}
          totalQuestions={questionPoolSize}
          totalAnswered={answerWrong + answerCorrect}
          toggleQuestionAnswer={()=>this._toggleQuestionAnswer()}
          correctSubmit={()=>this._correctSubmit()}
          incorrectSubmit={()=>this._incorrectSubmit()}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
