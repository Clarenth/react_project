import React, { Component } from 'react';
import axios from 'axios';

export default class CreateRoom extends Component {

  onSubmit = (e) => {
    e.preventDefault();
    let roomName = document.getElementById('name').value;
    let roomStatus = document.getElementById('status').value.toLowerCase();

    axios.post('http://localhost:4000/api/rooms', {
      name: roomName,
      status: roomStatus
    })
      .then(response => {
        console.log(response);
        window.location.href = "/admin/home";
      })
      .catch(error => {
        console.log(error);
      });
      console.log('yur2')
  }

  render() {
    return (
      <div>
        <h4>Create a Room</h4>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
            <label htmlFor="status">Status</label>
            <select id="status" required>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <button type="submit" value="submit" className="btn btn-primary">
            Create Room
          </button>
        </form>
      </div>
    )
  }
}
