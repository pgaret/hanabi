import React, {Component} from 'react'
import { Col, Card } from 'antd'
import 'antd/dist/antd.css'

export default class PlayerCard extends Component{
  constructor(props){
    super(props)
    this.state = {selectedCard: -1}
  }

  render(){
    const color = this.props.clues.color ? this.props.clues.color : "grey"
    const number = this.props.clues.number ? this.props.clues.number : "?"
    return (
      <Col span={3}>
        <Card onClick={()=>{this.props.selectCard(this.props.index)}} style={{cursor: "pointer", backgroundColor: color}} key={this.props.index}>
          <p style={{fontSize: "1.25vw", color: "white"}}>{this.props.card.color[0]}{this.props.card.number}</p>
        </Card>
      </Col>
    )
  }
}
