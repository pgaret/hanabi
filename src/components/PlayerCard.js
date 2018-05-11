import React, {Component} from 'react'
import { Col, Card } from 'antd'
import 'antd/dist/antd.css'

export default class PlayerCard extends Component{
  constructor(props){
    super(props)
    this.state = {selectedCard: -1}
  }

  render(){
    const myTurn = {
      color: this.props.clues.color ? this.props.clues.color : "grey",
      number: this.props.clues.number ? this.props.clues.number : "?"
    }
    const otherTurn = this.props.card
    const color = this.props.turn ? myTurn.color : otherTurn.color

    var fontColor

    if (this.props.turn) {
      if (!this.props.clues.color){
        fontColor = "white"
      } else {
        if (this.props.clues.color !== "blue" && this.props.clues.color !== "red"){
          fontColor = "black"
        } else {
          fontColor = "white"
        }
      }
    } else {
      if (this.props.card.color !== "blue" && this.props.card.color !== "red"){
        fontColor = "black"
      } else {
        fontColor = "white"
      }
    }

    return (
      <Col span={3}>
        <Card onClick={()=>{this.props.selectCard(this.props.index)}} style={{cursor: "pointer", backgroundColor: color}} key={this.props.index}>
          { this.props.turn ?
              <div style={{fontSize: "1.25vw", color: fontColor}}>
                {myTurn.number}
                <p>{this.props.clues.number}, {this.props.clues.color ? this.props.clues.color[0] : ""}</p>
              </div> :
              <div style={{fontSize: "1.25vw", color: fontColor}}>
                {otherTurn.number}
                <p>{this.props.clues.number}, {this.props.clues.color ? this.props.clues.color[0] : ""}</p>
              </div>
          }
        </Card>
      </Col>
    )
  }
}
