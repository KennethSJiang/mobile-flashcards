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
      console.log("ADD_DECK [old] ------ " + JSON.stringify(action.deck))
      const newState = {
        ...state,
        ...action.deck
      }
      console.log("ADD_DECK [new] ------ " + JSON.stringify(newState))
      return newState
    default:
      return state
  }
}

export default decks
