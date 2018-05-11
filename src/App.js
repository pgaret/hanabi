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
    ], discard: [], playerCount: 3, players: [], log: [], start: false, endTurn: false, turn: 0, fireworks: {blue: 0, white: 0, yellow: 0, red: 0, green: 0}}
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
      for (let i = 0; i < this.state.playerCount; i++){
        var player = []
        for (var k = 0; k < 5; k++){
          const index = Math.floor((Math.random() * updatedDeck.length-1) + 1)
          player.push(updatedDeck[index])
          updatedDeck.splice(index, 1)
        }
        players.push(player)
      }
      this.setState({players: players, deck: updatedDeck, start: true})
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
      console.log("Played")
      this.drawCard(playerNum, players)
      this.setState({fireworks: fireworks, log: [...this.state.log, <div key={this.state.log.length}>{playerNum} successfully played {card.color} {card.number}</div>]})
      if (card.number == 5) this.setState({clues: this.state.clues+1})
      this.updateTurn()
    } else{
      this.discardCard(cardIndex, playerNum)
      this.setState({errors: --this.state.errors, log: [...this.state.log, <div key={this.state.log.length}>{playerNum} made an error with {card.color} {card.number}</div>]})
      this.updateTurn()
      //Discard card function draws a card
    }
  }

  discardCard(cardIndex, playerNum){
    let players = this.state.players
    let discard = this.state.discard
    let card = players[playerNum][cardIndex]
    discard.push(players[playerNum][cardIndex])
    players[playerNum].splice(cardIndex, 1)
    this.drawCard(playerNum, players)
    this.setState({clues: this.state.clues + 1, discard: discard, log: [...this.state.log, <div key={this.state.log.length}>{playerNum} discarded {card.color} {card.number}</div>]})
    this.updateTurn()
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
    console.log("Color: "+color, "Card Number: "+number, "Player Num: "+playerNumber)
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
    this.setState({players: players, clues: this.state.clues - 1,
      log: [...this.state.log, <div key={this.state.log.length}>{playerNumber} received clue {clue}</div>]})
    this.updateTurn()
  }

  testClue = (playerNumber, cardIndex) => {
    let card = this.state.players[playerNumber][cardIndex]
    if (!card.clues.color && card.clues.number){
      // Playable
      if (card.clues.number === 1) return Object.values(this.state.fireworks).includes(0)
      else return Object.values(this.state.fireworks).includes(card.clues.number-1)
    } else if (card.clues.color && !card.clues.number){
      // All numbers of this color have been played
      return this.state.fireworks[card.clues.color] < 5
    } else if (card.clues.color && card.clues.number){
      return this.state.fireworks[card.clues.color] === card.clues.number - 1
    } else {
      return false
    }
  }

  testPlayable = (playerNumber, cardIndex) => {
    let card = this.state.players[playerNumber][cardIndex]
    return (Object.values(this.state.fireworks).includes(card.clues.number-1) && !Object.values(this.state.fireworks).includes(card.clues.number))
  }

  takeTurn = (playerNumber) => {

  }

  // updateTurn = () => {
  //   this.setState({endTurn: true})
  // }

  updateTurn = () => {
    console.log("Updating turn",this.state.turn)
    if (this.state.turn === this.state.playerCount-1){
      this.setState({turn: 0})
    } else {
      this.setState({turn: this.state.turn+1})
    }
    console.log("Updated turn successfully?")
  }

  render() {
    console.log(this.state)
    var players = []
    for (let i = 0; i < this.state.playerCount; i++){
      players.push(<Player key={i} name={i} clues={this.state.clues} players={this.state.players} playerCount={this.state.playerCount} turn={this.state.turn} giveClue={this.receiveClue} playCard={this.playCard} discardCard={this.discardCard} drawCard={this.drawCard} />)
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
