# Noughts and Crosses

## Overview

A single player tic-tac-toe game built in React. This game offers two difficulty levels (beatable and unbeatable).

## Trade offs and potential next steps

- Integration tests - I would add additional integration level tests to further test the available user interactions.
- Additional difficulty levels - It could be interesting to implement a novice difficulty level that makes completely uneducated/random moves.
- Alpha-beta pruning - This could speed up the time it takes to determine the computer's move by pruning parts of the game tree.

## Architecture

This project is composed of several components to display the game on the screen. It utilizes React hooks and context for state management.

- src - This directory contains the majority of the project code
  - components - The components that make up the UI of the application
    - Board.js
      - The main board component. This displays the grid of cells and also handles the win/loss/tie notifications and a click handler for the cells.
    - Cell.js
      - A single cell component that makes up the board. This component handles the display of the markers and win/loss conditions.
    - Controls.js
      - A composed component to handle displaying the game settings controls in a responsive way.
    - Difficulty.js
      - The difficulty mode selector switch.
    - Header.js
      - A simple header component for the page.
    - MoveFirst.js
      - A set of radio buttons that allows the user to select between the player or the computer moving first.
    - Restart.js
      - A button to restart the game or to enable the user to play again after the game has ended.
  - context - The contexts that handle the application state.
    - settings.js
      - A context that stores the settings for the application such as the difficulty level and which player will move first.
    - status.js
      - A context that stores the status of the current game and allows for updates to the game board.
  - ai.js
    - The AI service that is used to determine the next move the computer should make. This utilizes the minimax algorithm for this determination.
  - ai.test.js
    - Unit tests for the AI service.
  - App.css
    - Global CSS to be applied to the entire application.
  - App.js
    - The root component of the application.
  - App.test.js
    - Unit tests for UI of the application.
  - constants.js
    - Some helpers to keep values consistent between files
  - endgame.js
    - A service to validate the end game scenarios for the game. Determining win/loss/tie situations.
  - endgame.test.js
    - Unit tests for the end game service.
  - reportWebVitals.js
    - A create-react-app boilerplate file
  - setupTests.js
    - A jest setup file

## Installation and Running

### Install Dependencies

```bash
$ yarn install
```

### Start Developer Mode

```bash
$ yarn start
```

### Run Unit Tests

```bash
$ yarn test
```
