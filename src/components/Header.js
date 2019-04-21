import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function Header() {
    return (
      <header style={headerStyle}>
          <h1>Socket.IO Chat</h1>
          <a style={linkStyle} href="/">Home</a> | 
          <a style={linkStyle} href="/admin">Admin Login</a>
      </header>
    )
  }
  
  const headerStyle = {
      background: '#333',
      color: '#fff',
      textAlign: 'center',
      padding: '10px'
  }
  
  const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
  }