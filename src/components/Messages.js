import React, { Component } from 'react'
import axios from 'axios';

export default class Messages extends Component {

  state = {
      messages: []
  }

  componentWillMount = () => {
    axios.get('http://localhost:4000/api/messages')
      .then( ({data}) => {
        console.log(data)
        this.setState({messages: data});
      })
      .catch(err => console.warn(err))
  }

  renderMessages = () => {
    let messages = this.state.messages.map(message =>
      <tr>
        <td>{message.username}</td>
        <td>{message.room}</td>
        <td>{message.message}</td>
        <td>{message.time}</td>
      </tr>
    )
    return(messages)
  }

  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Room</th>
            <th>Message</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {this.renderMessages()}
        </tbody>
      </table>
    )
  }
}
