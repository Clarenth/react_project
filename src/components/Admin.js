import React, { Component } from 'react'
import Events from './Events';
import Messages from './Messages';
import Rooms from './Rooms';

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.showEvents = this.showEvents.bind(this);
    this.showMessages = this.showMessages.bind(this);
    this.showRooms = this.showRooms.bind(this);
  }

  state = {
    subject: ""
  }

  showEvents(){
    this.setState({subject: "events"});
  }
  showMessages(){
    this.setState({subject: "messages"});
  }
  showRooms(){
    this.setState({subject: "rooms"});
  }

  render() {
    let table;
    switch(this.state.subject){
      case "events":
        table = <Events />
        break;
      case "messages":
        table = <Messages />
        break;
      case "rooms":
        table = <Rooms />
        break;
      default:
        table = <div></div>;
    }

    return (
      <div id="admincontent">
        <h2>Administrative Functions</h2>
        <nav>
          <ul>
            <li>
                <button onClick={this.showEvents}>
                  Event History
                </button>
            </li>
            <li>
                <button onClick={this.showMessages}>
                  Chat History
                </button>
            </li>
            <li>
                <button onClick={this.showRooms}>
                  Rooms
                </button>
            </li>
          </ul>
        </nav>
        {table}
      </div>
    )
  }
}
