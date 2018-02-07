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
    phy6_2_5_vs1: 1,
    phy6_2_12_vs1: 1,
    phy9_3_6_vs1: 1,
    phy2_5_vs1: 1,
    phy8_1_3_vs1: 1,
    phy5_5_vs1: 1,
    alkPhosphatase: '',
    gammaGT : '',
    ALT: '',
    CEA: '',
    CA199: '',
    proba : 0
  }

  updateValue = (e) => {
    let value = e.target.value
    if(e.target.id === 'gender'){
      if(e.target.value === 'Male') value = 0
      else value = 1
    }

    if(e.target.id === 'phy6_2_5_vs1' || e.target.id === 'phy6_2_12_vs1' || e.target.id === 'phy9_3_6_vs1' ||
       e.target.id === 'phy2_5_vs1' || e.target.id === 'phy8_1_3_vs1' || e.target.id === 'phy5_5_vs1' )
    { 
      e.target.value === 'เคย' ? value = 1 : value = 0;
    }

    this.setState({
      [e.target.id]: parseInt(value)
    })
  }

  handlePostForRecommend(){
    
    const {patientNo,gender,age,height,weight,
      phy6_2_5_vs1,phy6_2_12_vs1,phy9_3_6_vs1,phy2_5_vs1,phy8_1_3_vs1,phy5_5_vs1,
      alkPhosphatase,gammaGT,ALT,CEA,CA199} = this.state

    axios.post('http://localhost:3000/predict/test/cholan', {
      patientNo,gender,age,height,weight,
      phy6_2_5_vs1,phy6_2_12_vs1,phy9_3_6_vs1,phy2_5_vs1,phy8_1_3_vs1,phy5_5_vs1,
      alkPhosphatase,gammaGT,ALT,CEA,CA199
    })
    .then(res => {
      console.log("Test insert value")
      console.log(res);
      console.log(res.data.results);
      this.setState({
        proba : res.data.results.proba
      })

    })
    .catch(function (error) {
      console.log(error);
    });

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
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy6_2_12_vs1</label>
            <select class="form-control" id="phy6_2_12_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy9_3_6_vs1</label>
            <select class="form-control" id="phy9_3_6_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy2_5_vs1</label>
            <select class="form-control" id="phy2_5_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy8_1_3_vs1</label>
            <select class="form-control" id="phy8_1_3_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">phy5_5_vs1</label>
            <select class="form-control" id="phy5_5_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
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

          <button data-toggle="modal" data-target="#myModal" 
                  onClick={() => this.handlePostForRecommend()}
                  type="button" 
                  class="btn btn-primary">
                  Submit
          </button>
          
        </form>

        {/* Modal */}
        <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-lg">
        
          <div className="modal-content">
            <div className="modal-header">
              <h4>Recommendation</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <p>  Probaility : {this.state.proba*100}%</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          
        </div>
      </div>


      </Wrapper>
    )
  }
}

export default Prediction
