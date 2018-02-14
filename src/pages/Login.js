import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { loginToken } from '../reducer/action.js'
import { Link,withRouter } from 'react-router-dom'

class Login extends Component{

    state =  {
        username : '',
        password : '',
        token : '',
        role : ''
    }

    updateValue = (e) => {
        let value = e.target.value
        this.setState({
          [e.target.id]: value
        })
      }


    async handleLogin(){
        const { username,password,token } = this.state
        const { dispatch } = this.props

        try {
            const res = await axios.post('http://localhost:3000/login', {
                username,
                password
            })
    
            this.setState({
                token : res.data.token
            })
    
            await dispatch(loginToken(username,this.state.token,res.data.role))

            console.log("Check value after dispatching")

            console.log(this.props.username)
            console.log(this.props.loginToken)
            console.log(this.props.role)

            if(this.props.role === 'Doctor')
                this.props.history.push("/dashboard")
            else if(this.props.role === 'User')
                this.props.history.push("/prediction")

        } catch (error) {
            console.log(error)
        }
        
    }
    
    render(){

        const { dispatch } = this.props

        //console.log(this.props)
        console.log(this.state)

        return(
            <div style={{width:'50%',margin : 'auto'}}>
              <form>
                <div className="form-group">
                    <input type="text" className="form-control" id="username" placeholder="Username" onChange={this.updateValue} />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.updateValue} />
                </div>

                <button type="button" style={{margin:'auto'}} className="btb btn-primary"
                    onClick={() => this.handleLogin()}
                >
                    Login
                </button>

    

              </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Login)