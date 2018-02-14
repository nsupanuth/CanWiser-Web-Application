import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import styled from 'styled-components';

import Navbar from './Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Prediction from './pages/Prediction'
import Switch from 'react-router-dom/Switch';

const Wrapper = styled.div`
  .container-fluid {
    margin-top: 50px;
  }
`;

export default class App extends Component {
  render() {
    return (
      <Wrapper>
          <div className="container-fluid">
              <Switch>
                <Route exact path="/" component = {Login} />
                <div className="content-wrapper">
                    <Navbar />
                    <Route exact path="/dashboard" component={Home} />
                    <Route exact path="/upload" component={Upload} />
                    <Route exact path="/prediction" component={Prediction} />
                </div>
              </Switch>
          </div>
      </Wrapper>
    )
  }
}
