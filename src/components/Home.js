
import React, { Component } from 'react';
import axios from 'axios';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:4000');

export default class Home extends Component {

  constructor(props){
    super(props);
    this.renderMessageHistory = this.renderMessageHistory.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  state = {
    rooms: [],
    messageHistory: []
  }

  componentDidMount = () => {
    axios.get('http://localhost:4000/api/rooms')
      .then( ({data}) => {
        this.setState({rooms: data});
      })
      .catch(err => console.warn(err));
  }

  submitUser = event => {
    event.preventDefault();

    let username = document.getElementById("username");
    let room = document.getElementById("room");
    let userFormArea = document.getElementById("userFormArea");
    let msgArea = document.getElementById("msgArea");

    if(username.value === ""){
        alert("Pick a Username");
        return false;
    }
  
    socket.emit("joinRoom", {socket_id: socket.id,username: username.value, room: room.value},(data)=>{
      if(data){
        userFormArea.style.display = "none";
        msgArea.style.display = "block";
        
        axios.post('http://localhost:4000/api/events', {
          socket_id: socket.id,
          username: username.value,
          room: room.value,
          action: `${username.id} chose ${username.value} as name and Logged in room ${room.value}`
        })
          .then( response => {
            console.log(response);
          })
          .catch( error => {
            console.log(error);
          });
        }
    });
    axios.post('http://localhost:4000/api/roomhistory', {room: room.value})
      .then(({data}) => {
        let messages = [];
        for(let event of data){
          messages.push({username: event.username, message: event.message});
        }
        this.setState({messageHistory: messages});
        console.log(this.state.messageHistory);
      })
      .catch(err => console.warn(err));
  };


  submitMessage = event => {
    event.preventDefault();

    let username = document.getElementById("username");
    let room = document.getElementById("room");
    var message = document.getElementById("message");

    socket.emit("chat", {
        msg: message.value,
        user: username.value,
        room: room.value
    });
    //This doesnt work, idk why. So i update my chatbox below. Even though the only
    //user who can see it is the one who sent the msg.
    socket.on('msg', function(data){
      chatBox.innerHTML += "<p>" + username.value + ": " + message.value + "</p>";
    })

    var chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += "<p>" + username.value + ": " + message.value + "</p>";

    axios.post('http://localhost:4000/api/messages', {
        socket_id: socket.id,
        username: username.value,
        room: room.value,
        message: message.value
      })
      .then(response => {
        console.log(response);
        let messages = this.state.messageHistory;
        messages.push({username: username.value, message: message.value});
        this.setState({messageHistory: messages});
      })
      .catch(function (error) {
        console.log(error);
      });
    message.value = "";
  };

  
  renderRoomChoices = () => {
    let rooms = this.state.rooms.map(room =>
      <option>{room.name}</option>
    )
    return(rooms);
  }
  renderMessageHistory = () => {
    let messageHistory = this.state.messageHistory.map(message => 
      <p>{message.username}: {message.message}</p>
    );
    return(messageHistory);
  }

  render() {
    return (
      <div>
        <div id="userFormArea">
          <h2>Pick a Username and Room</h2>
          <form>
              <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" />
              </div>
              <select id="room" required>
                {this.renderRoomChoices()}
              </select>
              <button type="submit" onClick={this.submitUser}>
                Start Chatting!
              </button>
          </form>
        </div>
        <div id="msgArea">
            <div className="col-md-8">
                <div id="chatBox" style={{height:300, width:'100%', backgroundColor:'lightgrey'}}>
                {this.renderMessageHistory()}</div>
                <div id="feedback"></div>
                <form id="msgForm">
                    <div>
                        <label>Enter Message</label>
                        <input placeholder="message..." id="message" />
                        <br/>
                        <button type="submit" onClick={this.submitMessage} >
                          Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    )
  }
}
