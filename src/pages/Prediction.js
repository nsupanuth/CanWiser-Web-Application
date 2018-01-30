import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components';

const Wrapper = styled.div`

  width: 50%;
  margin: auto;
  text-align: center;
  font-family: 'Montserrat', sans-serif;

  h1 {
    color: #939393;
  }
`

class Prediction extends Component {

  state = {
    patientNo: '',
    gender: 0,
    age: '',
    height: '',
    weight: '',
    phy6_2_5_vs1: 0,
    phy6_2_12_vs1: 0,
    phy9_3_6_vs1: 0,
    phy2_5_vs1: 0,
    phy8_1_3_vs1: 0,
    phy5_5_vs1: 0,
    alkPhosphatase: '',
    ALT: '',
    CEA: '',
    CA199: ''
  }

  updateValue = (e) => {
    let value = e.target.value
    if(e.target.id == 'gender'){
      if(e.target.value == 'Male') value = 0
      else value = 1
    }
    this.setState({
      [e.target.id]: parseInt(value)
    })
  }

  handleFileUpload() {
    const formData = new FormData(this.refs.myForm)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    }

    axios.post('http://13.229.135.29:8080/retrain/upload', formData, config)
      .then(res => {
        console.log(res)
      })
  }

  render() {
    console.log(this.state)
    return (
      <Wrapper>
        <h1 style={{ marginTop: 100 }}>Fill Your Data Here !</h1>
        <form>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Patient Number</label>
            <input type="text" class="form-control" id="patientNo" placeholder="Number Only" onChange={this.updateValue} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Gender</label>
            <select class="form-control" id="gender" onChange={this.updateValue}>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Age</label>
            <input type="text" class="form-control" id="age" placeholder="Number Only" onChange={this.updateValue} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Height</label>
            <input type="text" class="form-control" id="height" placeholder="Number Only" onChange={this.updateValue} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Weight</label>
            <input type="text" class="form-control" id="weight" placeholder="Number Only" onChange={this.updateValue} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy6_2_5_vs1</label>
            <select class="form-control" id="phy6_2_5_vs1" onChange={this.updateValue}>
              <option>0</option>
              <option>1</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy6_2_12_vs1</label>
            <select class="form-control" id="phy6_2_12_vs1" onChange={this.updateValue}>
              <option>0</option>
              <option>1</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy9_3_6_vs1</label>
            <select class="form-control" id="phy9_3_6_vs1" onChange={this.updateValue}>
              <option>0</option>
              <option>1</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy2_5_vs1</label>
            <select class="form-control" id="phy2_5_vs1" onChange={this.updateValue}>
              <option>0</option>
              <option>1</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy8_1_3_vs1</label>
            <select class="form-control" id="phy8_1_3_vs1" onChange={this.updateValue}>
              <option>0</option>
              <option>1</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy5_5_vs1</label>
            <select class="form-control" id="phy5_5_vs1" onChange={this.updateValue}>
              <option>0</option>
              <option>1</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">GammaGT</label>
            <input type="text" class="form-control" id="gammaGT" placeholder="Number Only" onChange={this.updateValue}/>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">alkPhosphatase</label>
            <input type="text" class="form-control" id="alkPhosphatase" placeholder="Number Only" onChange={this.updateValue}/>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">ALT</label>
            <input type="text" class="form-control" id="ALT" placeholder="Number Only" onChange={this.updateValue}/>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">CEA</label>
            <input type="text" class="form-control" id="CEA" placeholder="Number Only" onChange={this.updateValue}/>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">CA199</label>
            <input type="text" class="form-control" id="CA199" placeholder="Number Only" onChange={this.updateValue}/>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </Wrapper>
    )
  }
}

export default Prediction
