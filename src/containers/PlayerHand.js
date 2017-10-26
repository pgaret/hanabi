import React, {Component} from 'react'
import PlayerCard from '../components/PlayerCard'
import { Row } from 'antd'
import 'antd/dist/antd.css'

export default class PlayerHand extends Component{
  constructor(props){
    super(props)
    this.state = {selectedCard: -1}
  }

  render(){
    const hand = this.props.hand.map((card, index)=>{
      return <PlayerCard selectCard={this.props.selectCard} key={index} index={index} card={card} clues={card.clues} />
    })
    return (
      <Row>
        {hand}
      </Row>
    )
  }
}
