import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import styled from 'styled-components';

import Navbar from './Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Prediction from './pages/Prediction'

const Wrapper = styled.div`
  .container-fluid {
    margin-top: 50px;
  }
`;

export default class App extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
              <div>
                <Route exact path="/" component = {Login} />
                <Route exact path="/dashboard" component={Home} />
                <Route exact path="/upload" component={Upload} />
                <Route exact path="/prediction" component={Prediction} />
              </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
