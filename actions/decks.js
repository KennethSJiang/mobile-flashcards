
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function receiveDecks(decks){
  // console.log("DECKS action is called. " + JSON.stringify(decks))
  return{
    type: RECEIVE_DECKS,
    decks
  }
}
