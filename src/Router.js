import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './pages/Home'

class Routes extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div class="content-wrapper">
          <div class="container-fluid">
            <Router>
              <div>
                <Route exact path="/" component={Home} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default Routes;
