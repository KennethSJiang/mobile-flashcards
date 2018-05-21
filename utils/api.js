import {AsyncStorage} from 'react-native'

export const QUESTIONS_KEY = 'QUESTIONS_KEY'

export function getDecks(){
  return AsyncStorage.getItem(QUESTIONS_KEY).then(_parseJson)
}

export function getDeck(id){
  return AsyncStorage.getItem(QUESTIONS_KEY).then(_parseJson)
}

export function createNewDeck(id, title){
  return AsyncStorage.mergeItem(QUESTIONS_KEY, JSON.stringify(
    {
      [id]: {
        title: title,
        questions: []
      }
    })).then(() => {
      getDecks().then((data)=>{
        console.log("API[createNewDeck] >>>>>>>>>>>>>>>>>" + JSON.stringify(data))
      })
    })
}

export function addCardToDeck(deckId, card){
  return getDecks().then((decks) => {
    const deck = decks[deckId]
    if(deck){
      const newDecks = {
        ...decks,
        [deckId]: {
          ...decks[deckId],
          questions: [...decks[deckId].questions.concat([card])]
        }
      }
      AsyncStorage.setItem(QUESTIONS_KEY, JSON.stringify(newDecks))
    }
  }).then(() => {
    getDecks().then((data)=>{
      console.log("API[addCardToDeck] >>>>>>>>>>>>>>>>>" + JSON.stringify(data))
    })
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
  }
}
