import React, {Component} from 'react'
import { Col, Card, Tag } from 'antd'
import 'antd/dist/antd.css'

export default class AICard extends Component{
  constructor(props){
    super(props)
    this.state = {selectedCard: -1}
  }

  render(){
    console.log(this.props.clues)
    console.log(Object.keys(this.props.clues).length)
    const tags = Object.keys(this.props.clues).length > 0 ? Object.values(this.props.clues).map((clue,index)=>{return <Tag key={"Clue:"+index}>{clue}</Tag>}) : <span />
    return (
      <Col span={3}>
        <Card onClick={()=>{this.selectCard(this.props.index)}} style={{cursor: "pointer", backgroundColor: this.props.color}} key={this.props.index}>
          <p style={{fontSize: "1.25vw", backgroundColor: "black", color: "white", padding: "1vw"}}>{this.props.number}</p>
          <br />
          {tags}
        </Card>
      </Col>
    )
  }
}
