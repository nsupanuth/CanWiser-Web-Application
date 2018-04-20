import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import styled from 'styled-components';

import Profile from './img/profile.jpg';

import { connect } from 'react-redux'
import { loginToken } from './reducer/action.js'

const Nav = styled.div`

font-family: 'Montserrat', sans-serif;

.bg-dark {
  background-color: #43bfc7 !important;
}

#mainNav.navbar-dark .navbar-collapse .navbar-sidenav {
  background: #43bfc7;
}

.nav-link-text {
  color: white !important;
}

.fa {
  color: white;
}

#mainNav.fixed-top.navbar-dark .sidenav-toggler {
  background-color: #43bfc7;
}

.fa-angle-left {
  color: transparent !important;
}

.fa-angle-right {
  color: white !important;
}

.profile-img img{
  width: 60%;
}

.profile-img {
  text-align: center;
}
`

class Navbar extends Component {

  handleLogout(){
    localStorage.clear()
  }

  componentDidMount(){
    if(this.props.username === '' && localStorage.getItem('token') != null){

          const { dispatch } = this.props
    
          var username = localStorage.getItem('username')
          var token = localStorage.getItem('token')
          var role = localStorage.getItem('role')
          
          dispatch(loginToken(username, token, role))
        }
  }

  render() {
    return (
      <Nav>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
          <a className="navbar-brand" href="/">CanWiser</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">

            <li className="nav-item profile-img" data-toggle="tooltip" data-placement="right" title="Dashboard">
                <img className="rounded-circle" alt="profile" src={Profile} />
            </li>

            { ((this.props.role === 'Doctor') && (this.props.loginToken != '')) ?
              <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                <Link className="nav-link" to="/dashboard">
                  <i className="fa fa-fw fa-dashboard"></i>
                  <span className="nav-link-text">Dashboard</span>
                 </Link>
              </li>
              : ''
            }

            { ((this.props.role === 'Doctor') && (this.props.loginToken != '')) ?
              <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                <Link className="nav-link" to="/upload">
                  <i className="fa fa-fw fa-area-chart"></i>
                  <span className="nav-link-text">Upload</span>
                </Link>
              </li>
              : ''
            }


              <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">
                <Link className="nav-link" to="/prediction">
                  <i className="fa fa-fw fa-table"></i>
                  <span className="nav-link-text">Prediction</span>
                </Link>
              </li>
              
            </ul>
            <ul className="navbar-nav sidenav-toggler">
              <li className="nav-item">
                <a className="nav-link text-center" id="sidenavToggler">
                  <i className="fa fa-fw fa-angle-left"></i>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
             
              <li className="nav-item">
                  <Link className="nav-link" to="/" onClick = {() => this.handleLogout()}>
                    <i className="fa fa-fw fa-sign-out"></i>Logout
                  </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Nav>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
  return state
}


export default connect(mapStateToProps)(Navbar)