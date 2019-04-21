import React, { Component } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Admin from './components/Admin';
import CreateRoom from './components/createroom';
import EditRoom from './components/EditRoom';

class App extends Component {
  render() {
    return (
      <div>
      <Header />
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/admin' exact component={AdminLogin} />
        <Route path='/admin/home' exact component={Admin} />
        <Route path='/admin/createroom' exact component={CreateRoom} />
        <Route path='/admin/editroom/:id' exact component={EditRoom} />
      </Router>
      </div>
    );
  }
}

export default App;

