import React, { Component } from 'react';
import './App.css';
import Login from './pages/login/index.js'
import Home from './pages/home/index.js'
import Register from './pages/register/index.js'
import { BrowserRouter as Router , Route} from "react-router-dom";
import axios from "axios"
console.log(window)
window.$axios = axios

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/Home" component={Home} />
            <Route path="/Register" component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
