import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { loginToken } from '../reducer/action.js'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components';

const Header = styled.header`

  text-align: center;
  color: black;
  
  .text {
    margin: auto;
    margin-top: 30px;
    width: 40%;
    height: 400px;
    padding-bottom: 100px; 
    background-color: white;
    box-shadow: 0px 0px 100px #777;
  }

  .fa {
    margin-top: 50px;
  }

  .font-color {
    color: #46B1D6;
  }

  h1 {
    margin-top: 10px;
  }

  .btn {
    width: 100%;
    outline: none !important;
    box-shadow: none !important;
  }
`

const Form = styled.form`
  width: 70%;
  text-align: cneter;
  margin: auto;
  font-family: 'Catamaran';

  .form-check {
    text-align: left;
  }

  .btn-primary {
    color: #fff;
    background-color: #4BB2D4;
    border-color: #4BB2D4;
}
`

class Login extends Component {

  state = {
    username: '',
    password: '',
    token: '',
    role: ''
  }

  updateValue = (e) => {
    let value = e.target.value
    this.setState({
      [e.target.id]: value
    })
  }


  async handleLogin() {
    const { username, password, token } = this.state
    const { dispatch } = this.props

    try {
      const res = await axios.post('http://localhost:3000/login', {
        username,
        password
      })

      this.setState({
        token: res.data.token
      })

      localStorage.setItem("username",username)
      localStorage.setItem("token",this.state.token)
      localStorage.setItem("role",res.data.role)

      await dispatch(loginToken(username, this.state.token, res.data.role))

  
      /*
      console.log("Check value after dispatching")

      console.log(this.props.username)
      console.log(this.props.loginToken)
      console.log(this.props.role)
      */

      if (this.props.role === 'Doctor')
        this.props.history.push("/dashboard")
      else if (this.props.role === 'User')
        this.props.history.push("/prediction")

    } catch (error) {
      console.log(error)
    }

  }

  render() {

    const { dispatch } = this.props

    //console.log(this.props)
    // console.log(this.state)

    return (
      <div style = {{margin:'0px'}}>
        <Header class="masthead">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="text">
                  <i class="fa fa-user-circle-o fa-5x font-color" aria-hidden="true"></i>
                  <h1 style={{ fontFamily: 'Catamaran' }}>Sign In</h1>
                  <Form>
                    <div className="form-group">
                      <input type="text" className="form-control" id="username" placeholder="Username" onChange={this.updateValue} />
                    </div>

                    <div className="form-group">
                      <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.updateValue} />
                    </div>

                    <button type="button" style={{ margin: 'auto' }} className="btn btn-primary"
                      onClick={() => this.handleLogin()}
                    >
                      Login
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Header>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Login)