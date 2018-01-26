import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components';

import Navbar from './Navbar'
import Home from './pages/Home'
import Upload from './pages/Upload'

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
              </div>
            </Router>
          </div>
        </div>
      </Wrapper>
    )
  }
}
