import React, { Component } from 'react';
import Player from './containers/Player.js'
import AIPlayer from './containers/AIPlayer.js'
import GameBoard from './containers/GameBoard.js'
import { Input, Button } from 'antd'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {clues: 8, errors: 3, deck: [
      {color: 'blue', number: 1, clues: {}},{color: 'blue', number: 1, clues: {}},{color: 'blue', number: 1, clues: {}},
      {color: 'blue', number: 2, clues: {}},{color: 'blue', number: 2, clues: {}},
      {color: 'blue', number: 3, clues: {}},{color: 'blue', number: 3, clues: {}},
      {color: 'blue', number: 4, clues: {}},{color: 'blue', number: 4, clues: {}},
      {color: 'blue', number: 5, clues: {}},
      {color: 'white', number: 1, clues: {}},{color: 'white', number: 1, clues: {}},{color: 'white', number: 1, clues: {}},
      {color: 'white', number: 2, clues: {}},{color: 'white', number: 2, clues: {}},
      {color: 'white', number: 3, clues: {}},{color: 'white', number: 3, clues: {}},
      {color: 'white', number: 4, clues: {}},{color: 'white', number: 4, clues: {}},
      {color: 'white', number: 5, clues: {}},
      {color: 'yellow', number: 1, clues: {}},{color: 'yellow', number: 1, clues: {}},{color: 'yellow', number: 1, clues: {}},
      {color: 'yellow', number: 2, clues: {}},{color: 'yellow', number: 2, clues: {}},
      {color: 'yellow', number: 3, clues: {}},{color: 'yellow', number: 3, clues: {}},
      {color: 'yellow', number: 4, clues: {}},{color: 'yellow', number: 4, clues: {}},
      {color: 'yellow', number: 5, clues: {}},
      {color: 'red', number: 1, clues: {}},{color: 'red', number: 1, clues: {}},{color: 'red', number: 1, clues: {}},
      {color: 'red', number: 2, clues: {}},{color: 'red', number: 2, clues: {}},
      {color: 'red', number: 3, clues: {}},{color: 'red', number: 3, clues: {}},
      {color: 'red', number: 4, clues: {}},{color: 'red', number: 4, clues: {}},
      {color: 'red', number: 5, clues: {}},
      {color: 'green', number: 1, clues: {}},{color: 'green', number: 1, clues: {}},{color: 'green', number: 1, clues: {}},
      {color: 'green', number: 2, clues: {}},{color: 'green', number: 2, clues: {}},
      {color: 'green', number: 3, clues: {}},{color: 'green', number: 3, clues: {}},
      {color: 'green', number: 4, clues: {}},{color: 'green', number: 4, clues: {}},
      {color: 'green', number: 5, clues: {}}
    ], discard: [], playerCount: 3, players: [], log: [], start: false, turn: 0, fireworks: {blue: 0, white: 0, yellow: 0, red: 0, green: 0}}
    this.playCard = this.playCard.bind(this)
    this.drawCard = this.drawCard.bind(this)
    this.discardCard = this.discardCard.bind(this)
    this.receiveClue = this.receiveClue.bind(this)
    this.takeTurn = this.takeTurn.bind(this)
  }

  componentHasMounted(){
    this.startGame()
  }

  startGame = () => {
    if (this.state.playerCount > 1){
      var updatedDeck = this.state.deck
      var players = []
      this.setState({start: true})
      for (let i = 0; i < this.state.playerCount; i++){
        var player = []
        for (var k = 0; k < 5; k++){
          const index = Math.floor((Math.random() * updatedDeck.length-1) + 1)
          player.push(updatedDeck[index])
          updatedDeck.splice(index, 1)
        }
        players.push(player)
      }
      this.setState({players: players, deck: updatedDeck})
    }
  }

  playCard(cardIndex, playerNum){
    let card = this.state.players[playerNum][cardIndex]
    let fireworks = this.state.fireworks
    let players = this.state.players
    console.log(card)
    console.log(this.state.fireworks)
    console.log(this.state.fireworks[card.color])
    if (card.number === this.state.fireworks[card.color]+1){
      fireworks[card.color]++
      players[playerNum].splice(cardIndex, 1)
      this.setState({fireworks: fireworks})
      this.updateTurn()
      this.drawCard(playerNum, players)
      console.log("Played")
      this.setState({log: [...this.state.log, <div key={this.state.log.length}>{playerNum} successfully played {card.color} {card.number}</div>]})
    } else{
      this.setState({errors: --this.state.errors})
      this.updateTurn()
      this.discardCard(cardIndex, playerNum)
      this.setState({log: [...this.state.log, <div key={this.state.log.length}>{playerNum} made an error with {card.color} {card.number}</div>]})
      //Discard card function draws a card
    }
  }

  discardCard(cardIndex, playerNum){
    let players = this.state.players
    let discard = this.state.discard
    let card = players[playerNum][cardIndex]
    discard.push(players[playerNum][cardIndex])
    players[playerNum].splice(cardIndex, 1)
    this.setState({discard: discard})
    this.updateTurn()
    this.drawCard(playerNum, players)
    this.setState({log: [...this.state.log, <div key={this.state.log.length}>{playerNum} discarded {card.color} {card.number}</div>]})
  }

  drawCard(playerNum, players = this.state.players, updatedDeck = this.state.deck){
    const index = Math.floor((Math.random() * updatedDeck.length-1) + 1)
    players[playerNum].push(this.state.deck[index])
    updatedDeck.splice(index, 1)
    this.setState({players: players, deck: updatedDeck})
  }

  receiveClue(color, number, playerNumber){
    var players = this.state.players
    var newHand = this.state.players[playerNumber]
    const clue = color ? color : number
    console.log(color, number, playerNumber)
    if (color){
      for (let i = 0; i < newHand.length; i++){
        if (newHand[i].color === color){
          newHand[i].clues.color = color
        }
      }
    }
    else if (number){
      for (let i = 0; i < newHand.length; i++){
        if (newHand[i].number === number){
          newHand[i].clues.number = number
        }
      }
    }
    players[playerNumber] = newHand
    this.setState({players: players, clues: this.state.clues - 1})
    this.setState({log: [...this.state.log, <div key={this.state.log.length}>{playerNumber} received clue {clue}</div>]})
    this.updateTurn()
  }

  testClue = (playerNumber, cardIndex) => {
    let card = this.state.players[playerNumber][cardIndex]
    if (!card.clues.color && card.clues.number){
      return Object.values(this.state.fireworks).includes(card.clues.number-1)
    } else if (card.clues.color && card.clues.number){
      return this.state.fireworks[card.clues.color] === card.clues.number - 1
    } else {
      return false
    }
  }

  takeTurn = (playerNumber) => {
    var takenAction = false
    for (let i = this.state.turn; i < this.state.playerCount; i++){
      if (i !== playerNumber){
        let thisPlayer = this.state.players[i]
        for (let j = 0; j < thisPlayer.length; j++){
          if (thisPlayer[j].number === 5 && !thisPlayer[j].clues.number){
            this.receiveClue("", 5, i)
            i = this.state.playerCount
            j = thisPlayer.length
            takenAction = true
          }
        }
        if (i === this.state.playerCount - 1) {
          i = -1
        } else if (i === this.state.turn - 1){
          i = this.state.playerCount
        }
      }
    }
    var hand = this.state.players[playerNumber]
    if (takenAction === false){
      var clues = hand.map((card, index)=>{if (Object.keys(card.clues).length > 0) {return index} else {return -1}})
      if (clues.filter(clue=>{return clue !== -1}).length > 0){
        for (let j = 0; j < clues.length; j++) {
          if (clues[j] !== -1 && this.testClue(playerNumber, j)) {
            console.log("AI ",playerNumber," playing card ",j)
            this.playCard(j, playerNumber)
            j = clues.length
          }
        }
      } else {
        console.log("AI ",playerNumber," discarding card ",4)
        this.discardCard(4, playerNumber)
      }
    }
  }

  updateTurn = () => {
    console.log("Updating turn")
    let turn = this.state.turn
    if (this.state.turn === this.state.playerCount-1){
      turn = 0
      this.setState({turn: 0})
    } else {
      turn += 1
      this.setState({turn: this.state.turn+1})
    }
    console.log(turn)
  }

  render() {
    console.log(this.state)
    var players = []
    players.push(<Player key={0} name={0} players={this.state.players} playerCount={this.state.playerCount} turn={this.state.turn} giveClue={this.receiveClue} playCard={this.playCard} discardCard={this.discardCard} drawCard={this.drawCard} />)
    for (let i = 1; i < this.state.playerCount; i++){
      players.push(<AIPlayer key={i} turn={this.state.turn} takeTurn={this.takeTurn} name={i} hand={this.state.players[i]} />)
    }
    return (
      <div className="App">
      { this.state.start ?
          <div>
            <GameBoard clues={this.state.clues} errors={this.state.errors} fireworks={this.state.fireworks} />
            <br />
            {this.state.log}
            <br />
            {players}
          </div> :
          <div>
            Player Count: <Input type='number' style={{width: "5vw"}} onChange={(e)=>{this.setState({playerCount: Number(e.target.value)})}} />
            <Button onClick={()=>{this.startGame()}}>Start</Button>
          </div>
      }
      </div>
    );
  }
}

export default App;
