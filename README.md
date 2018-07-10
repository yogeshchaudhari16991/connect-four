# Application
Simple Connect Four Game using React

# Technologies Used
- React 16.4.1
- npm 5.6.0
- Jest 23.4.0

# About app
- Initial project was created using 'create-react-app'
- Components added: Under directory 'src'
    1. Board: Grid layout for connect four board
    2. Row: Row in board layout
    3. Cell: Each cell in a row
- Tests added: Under directory '\_\_test\_\_'
    1. Board-test: 
        - Test for whether board is correctly rendered or not. 
        - Test for winning conditions
        - Test for draw condition

- Once app is launched, it will ask for player names. 'Player1' and 'Player2' act as default names
- 'New Game' button can be used to restart the game
- Once a game is finished a browser pop-up will appear displaying result (winner or draw) of current game

# How to run
- If required, install node dependencies using following script,
    `npm install`
- Currenlty app can be run using following npm script
    `npm run start`
- Visit localhost:3000 in your browser's window

# Testing
- If required, install node dependencies using following script,
    `npm install`
- Run jest tests using
    `npm run test`

# Roadmap
- Add eslint
- Add glamorous
