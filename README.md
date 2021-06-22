# React Coding Challenge

## Introduction
This project is an bare-bones React/Typescript template. Candidates who are invited to solve the coding challenge are required to fork this repository and implement any components/hooks/modules/tests they deem necessary for a good design. Once implemented, candidates are expected to share their repositories for internal review at Emerson.

## Challenge Description

The challenge consists in implementing a mini memory game in React and Typescript. These are the game rules:

-	The landing page should display a grid (4x4) of cards initially laid face down. 
-	Each card hides an image that can be revealed by clicking on the card.
-	The grid has unique pairs of distinct images (8 pairs for a 4x4 grid).
-	Images should display avatars provided by dicebear package https://github.com/dicebear/dicebear
-	A countdown timer (30 seconds) is displayed on top of the grid and starts when the first card is revealed.
-	When a user reveals two cards, two outcomes are possible: 
    -   If both card images match, they remain revealed for the rest of the game.
    -   Otherwise, these two cards are turned face down again 0.5 second after the second card was revealed.
-	The game ends when the last pair is revealed or when the time runs out.
-	The remaining seconds is considered to be the user score and should be displayed at the end in a dialog with a “play again” button.
-	Optional: Add a "restarts" button for resetting both the grid and the timer.
-	Optional: Add a dialog accessible from a settings button to configure the grid size and the timer value.

Candidates are encouraged to share their thoughts around any design decisions they make while coding their solution.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
