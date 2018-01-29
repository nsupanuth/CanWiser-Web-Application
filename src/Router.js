import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components';

import Navbar from './Navbar'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Prediction from './pages/Prediction'


const Wrapper = styled.div`
  .container-fluid {
    margin-top: 50px;
  }
`;

export default class Routes extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar />
        <div class="content-wrapper">
          <div class="container-fluid">
            <Router>
              <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/upload" component={Upload} />
                <Route exact path="/prediction" component={Prediction} />
              </div>
            </Router>
          </div>
        </div>
      </Wrapper>
    )
  }
}
