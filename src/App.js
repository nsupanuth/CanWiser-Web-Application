import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import styled from 'styled-components';

import Navbar from './Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Prediction from './pages/Prediction'
import Switch from 'react-router-dom/Switch';

/* Redux part */

const Wrapper = styled.div`
  .container-fluid {
    margin-top: 50px;
  }
`;

class App extends Component {

  render() {

    var token = localStorage.getItem('token')
    console.log("Token value")
    console.log(token)

    return (
          <div className="container-fluid">
              <Switch>
                <Route exact path="/" component = {Login} />
                <Wrapper>
                  <div className="container-fluid">
                    <div className="content-wrapper">
                        <Navbar />
                        <Route exact path="/dashboard" component={Home} />
                        <Route exact path="/upload" component={Upload} />
                        <Route exact path="/prediction" component={Prediction} />
                    </div>
                  </div>
                </Wrapper>
              </Switch>
          </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return state
// }

// export default connect(mapStateToProps)(App)
export default App