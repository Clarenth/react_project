import React, {Component} from 'react'
import Admin from './Admin';
import axios from 'axios';

export default class AdminLogin extends Component {

    state = {
        loggedin: false
    }

    onSubmit = (e) => {
      e.preventDefault();
      let adminUsername = document.getElementById('username').value.toLowerCase();
      let adminPassword = document.getElementById('password').value;
      axios.get('http://localhost:4000/api/admins')
        .then( (admins) => {
          for(let admin of admins.data){
            if(adminUsername === admin.username.toLowerCase() &&
               adminPassword === admin.password){
                 this.setState({loggedin: true});
                console.log('yurp');
              window.location.href = "/admin/home";
              break;
            }
            document.getElementById('warning').innerHTML = "Incorrect username or password";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render(){
        let display;
    
        if(this.state.loggedin){
          display = <Admin />
        }
        else{
          display = <div>
          <p id="warning"></p>
          <form onSubmit={this.onSubmit}>
           <label htmlFor="user">Username: </label>
            <input type="text" name="user" id="username" required />

           <label htmlFor="pass">Password: </label>
            <input type="password" name="pass" id="password" required />

            <input type="submit" value="Submit" />
          </form> 
      </div>
        }
        
        return(display);
      }
}

  ///


  