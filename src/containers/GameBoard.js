import React, {Component} from 'react'
import PlayerCard from '../components/PlayerCard'
import { Modal, Button, Card, Row, Col, Select, message } from 'antd'
import 'antd/dist/antd.css'

const Option = Select.Option

export default class GameBoard extends Component{
  constructor(props){
    super(props)
  }
  render(){
    console.log(this.props.fireworks)
    const fireworks = Object.keys(this.props.fireworks).map((firework,index)=>{
      return <p key={"Fireworks:"+index}>{firework}: {this.props.fireworks[firework]}</p>
    })
    return (
      <div>
        <p>Game Board</p>
        <p>Clues: {this.props.clues} | Bombs: {this.props.errors}</p>
        {fireworks}
      </div>
    )
  }
}
