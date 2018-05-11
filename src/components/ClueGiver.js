import React, {Component} from 'react'
import PlayerCard from '../components/PlayerCard'
import { Modal, Button, Card, Row, Col, Select, message } from 'antd'
import 'antd/dist/antd.css'

const Option = Select.Option

export default class ClueGiver extends Component{
  constructor(props){
    super(props)
    console.log(props.players)
    var players = []
    for (let i = 0; i < props.players.length; i++){
      if (i != props.player) players.push(<Option key={i}>Player {i}</Option>)
    }
    this.state = {selectedPlayer: -1, players: players, playerHand: [], numbers: [], colors: [], clue: false, reset: false}
  }

  handleClueGiving(){
    console.log(this.state)
    if (this.state.clue.number){
      this.props.giveClue("", this.state.clue.number, this.state.selectedPlayer)
      message.success("Clue "+this.state.clue.number+" given to Player "+this.state.selectedPlayer)
      this.props.cancelFunc()
    } else if (this.state.clue.color){
      this.props.giveClue(this.state.clue.color, "", this.state.selectedPlayer)
      message.success("Clue "+this.state.clue.color+" given to Player "+this.state.selectedPlayer)
      this.props.cancelFunc()
    } else {
      message.error("No clue selected")
    }
  }

  selectPlayer = (e) => {
    this.buildHand(this.props.players[e])
    const colorOptions = [...new Set(this.props.players[e].map(card=>{return card.color}))].map((color, index)=>{return <a key={"Color:"+index} onClick={()=>{this.filterHand(color, "")}}> {color} </a>})
    const numberOptions = [...new Set(this.props.players[e].map(card=>{return card.number}))].sort(this.sortBy).map((number, index)=>{return <a key={"Number:"+index} onClick={()=>{this.filterHand("", number)}}> {number} </a>})
    this.setState({selectedPlayer: e, colors: colorOptions, numbers: numberOptions})
  }

  filterHand(color = "", number = ""){
    const playerHand = this.props.players[this.state.selectedPlayer]
    if (color){
      this.buildHand(playerHand.filter((card)=>{if (card) return card.color === color; else return false}))
      this.setState({clue: {color: color}})
    }
    else if (number){
      this.buildHand(playerHand.filter((card)=>{if (card) return card.number === number; else return false}))
      this.setState({clue: {number: number}})
    }
    else {
      this.buildHand(playerHand)
      this.setState({clue: false})
    }
  }

  buildHand = (hand) => {
    const playerHand = hand.map((card, index)=>{
        return (
          <Col key={"FilteredHand:"+index} span={3}>
            <Card style={{backgroundColor: card.color}}>
              <p style={{fontSize: "1.25vw"}}>{card.number}</p>
            </Card>
          </Col>
        )
    })
    console.log(hand)
    this.setState({playerHand: playerHand})
  }

  sortBy = (a, b) => {
    return a - b
  }

  render(){
    const rowStyle = {}
    return (
      <Modal title="Give Clue" visible={this.props.visible} onOk={()=>{this.handleClueGiving()}} okText='Give Clue' cancelText='Cancel' onCancel={this.props.cancelFunc}>
        <Button onClick={()=>{this.selectPlayer(this.state.selectedPlayer)}}>Reset</Button>
        <Select defaultValue='None Selected' onChange={this.selectPlayer} style={{width: "10vw"}}>
          {this.state.players}
        </Select>
        { this.state.selectedPlayer !== -1 ?
          <Row>
            {this.state.colors}
            <br />{this.state.numbers}
            <br /><a onClick={()=>{this.filterHand()}}>Clear All</a>
            <hr />
            {this.state.playerHand}
          </Row> :
          <span />
        }
      </Modal>
    )
  }
}
