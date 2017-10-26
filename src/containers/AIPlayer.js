import React, {Component} from 'react'
import AIHand from '../containers/AIHand'
import { Button, Card, Row, Col } from 'antd'
import 'antd/dist/antd.css'

export default class AIPlayer extends Component{
  constructor(props){
    super(props)
    this.state = {selectedCard: -1}
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.turn,this.props.name)
    console.log(nextProps.turn===this.props.name)
    console.log(nextProps.turn==this.props.name)
    if(nextProps.turn === this.props.name){
      this.props.takeTurn(this.props.name)
    }
  }

  render(){
    const cardStyle = {width: "40vw", height: "25vh", overflowY: "scroll"}
    return (
      <Row>
        <Card style={cardStyle} title={"AI Player "+this.props.name}>
          <Row>
            <AIHand hand={this.props.hand} />
          </Row>
        </Card>
      </Row>
    )
  }
}
