import React, { Component } from 'react'
import axios from 'axios';

export default class Events extends Component {

  state = {
      events: []
  }

  componentWillMount = () => {
    axios.get('http://localhost:4000/api/events')
      .then( ({data}) => {
        console.log(data)
        this.setState({events: data});
      })
      .catch(err => console.warn(err))
  }

  renderEvents = () => {
    let events = this.state.events.map(event =>
      <tr>
        <td>{event.socket_id}</td>
        <td>{event.username}</td>
        <td>{event.room}</td>
        <td>{event.action}</td>
        <td>{event.time}</td>
      </tr>
    )
    return(events)
  }

  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Socket ID</th>
            <th>Username</th>
            <th>Room</th>
            <th>Action</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {this.renderEvents()}
        </tbody>
      </table>
    )
  }
}
