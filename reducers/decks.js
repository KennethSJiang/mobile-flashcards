import { RECEIVE_DECKS, ADD_CARD_TO_DECK, ADD_DECK } from '../actions/decks'

function decks(state={}, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return{
        ...state,
        ...action.decks
      }
    case ADD_CARD_TO_DECK:
      const { deckId, card } = action.card
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions.concat([card])]
        }
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    default:
      return state
  }
}

export default decks
