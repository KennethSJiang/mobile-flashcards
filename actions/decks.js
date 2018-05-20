
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks(decks){
  return{
    type: RECEIVE_DECKS,
    decks
  }
}

export function addCard(deckId, card){
  return{
    type: ADD_CARD_TO_DECK,
    card: { deckId, card }
  }
}

export function addDeck(deckId, title){
  const test =  {
    type: ADD_DECK,
    deck: {
      [deckId]: {
        title: title,
        questions: []
      }
    }
  }
  console.log(`addDeck ${deckId}/${title}/${JSON.stringify(test)}`)
  return test
}
