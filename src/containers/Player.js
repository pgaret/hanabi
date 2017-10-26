import React, {Component} from 'react'
import PlayerHand from './PlayerHand'
import ClueGiver from '../components/ClueGiver'
import { Modal, Button, Card, Row, Col, Select } from 'antd'

import 'antd/dist/antd.css'

export default class Player extends Component{
  constructor(props){
    super(props)
    this.state = {selectedCard: -1, playCard: false, discardCard: false, giveClue: false}

    this.giveClue = this.giveClue.bind(this)
    this.discardCard = this.discardCard.bind(this)
    this.playCard = this.playCard.bind(this)
  }

  selectCard = (index) => {
    this.setState({selectedCard: index})
  }

  giveClue = (color, number, playerNumber) => {
    console.log(color, number, playerNumber)
    this.setState({giveClue: false})
    this.props.giveClue(color, number, playerNumber)
  }

  discardCard = () => {
    this.setState({discardCard: false})
    this.props.discardCard(this.state.selectedCard, this.props.name)
  }

  playCard = () => {
    console.log("Play")
    this.setState({playCard: false})
    this.props.playCard(this.state.selectedCard, this.props.name)
  }

  render(){
    console.log(this.props)
    const cardStyle = {width: "40vw", height: "25vh", overflowY: "scroll"}
    return(
      <div>
        <Row>
          <Col span={12}>
            <Card style={cardStyle} title={"Player "+this.props.name}>
              <Row>
                <PlayerHand selectCard={this.selectCard} hand={this.props.players[0]} />
              </Row>
            </Card>
          </Col>
          { this.props.turn == this.props.name ?
              <Col span={12}>
                <Button onClick={()=>{this.setState({playCard: true})}}>Play Card</Button>
                <Button onClick={()=>{this.setState({discardCard: true})}}>Discard Card</Button>
                <Button onClick={()=>{this.setState({giveClue: true})}}>Give Clue</Button>
              </Col>
              : <p>Waiting for Player {this.props.turn}</p>
          }
        </Row>
        <ClueGiver visible={this.state.giveClue} giveClue={this.giveClue} cancelFunc={()=>{this.setState({giveClue: false})}} players={this.props.players} />
        <Modal title="Play A Card" visible={this.state.playCard} onOk={this.playCard} okText='Play' cancelText='Cancel' onCancel={()=>{this.setState({playCard: false})}}>
           <PlayerHand selectCard={this.selectCard} hand={this.props.players[0]} />
        </Modal>
        <Modal title="Discard A Card" visible={this.state.discardCard} onOk={this.discardCard} okText='Discard' cancelText='Cancel' onCancel={()=>{this.setState({discardCard: false})}}>
           <PlayerHand selectCard={this.selectCard} hand={this.props.players[0]} />
        </Modal>

      </div>
    )
  }
}
