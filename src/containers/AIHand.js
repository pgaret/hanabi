import React, {Component} from 'react'
import AICard from '../components/AICard'
import { Button, Card, Row, Col } from 'antd'
import 'antd/dist/antd.css'

export default class AIHand extends Component{
  constructor(props){
    super(props)
    this.state = {selectedCard: -1}
  }

  render(){
    console.log(this.props.hand)
    const hand = this.props.hand.map((card, index)=>{
      return <AICard key={index} index={index} clues={card.clues} number={card.number} color={card.color} />
    })
    return (
        <Row>
          {hand}
        </Row>
      )
  }
}
