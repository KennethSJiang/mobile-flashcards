# Mobile Flashcards Project
This is a mobile application built in ReactNative that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks. Last but not least, the app will send local notification on per daily basis to remind user to study the flashcards.

* install all project dependencies with `npm install` or `yarn install`
* start the development server with `npm start` or `yarn start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── App.js # This is the root of your app.
├── actions # This is the actions folder for redux
    ├── decks.js # actions for all decks
├── components
    ├── DeckDetail.js # This component renders Deck Detail, includes actions to start quiz and add cards
    ├── DeckList.js # This component is default screen of the app. Contains list of decks
    ├── DeckSummary.js # Used by DeckList rendering
    ├── NewCard.js # Screen to add new card
    ├── NewDeck.js # Screen to add new Deck
    ├── Quiz.js # Component that manage quiz questions/answers and score
    ├── TextButton.js # helper component
├── reducers # reducers for redux
    ├── decks.js # decks reducer
    ├── index.js # combined reducers
├── utils
    ├── api.js # use StorageAsync to manage question/answer api calls
    ├── colors.js # colors
    ├── helpers.js # helpers
```

## Data
Sample data is used as the baseline storage items. 
```
{
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
```
