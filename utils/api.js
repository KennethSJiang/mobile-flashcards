import {AsyncStorage} from 'react-native'

export const QUESTIONS_KEY = 'QUESTIONS_KEY'

export function getDecks(){
  return AsyncStorage.getItem(QUESTIONS_KEY).then(_parseJson)
}

export function getDeck(id){
  return AsyncStorage.getItem(QUESTIONS_KEY).then(_parseJson)
}

export function saveDeckTitle(title){
  return AsyncStorage.mergeItem(QUESTIONS_KEY, JSON.stringify(
    {
      [title]: title,
      questions: []
    }))
}

export function addCardToDeck(title, card){
  return getDecks().then((decks) => {
    const deck = decks[title]
    if(deck){
      deck.questions.concat([card])
      decks[title] = deck
      AsyncStorage.saveItem(QUESTIONS_KEY, decks)
    }
  })
}

function _parseJson(jsonString){
  return JSON.parse(jsonString)
}

export const _DATA = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  ReactNative: {
    title: 'ReactNative',
    questions: [
      {
        question: 'What is React Native?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  Money: {
    title: 'Money and Banking',
    questions: [
      {
        question: 'What is Money?',
        answer: 'Good stuff'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
}
