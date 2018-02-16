import React, { Component } from 'react';
import { ResponsiveContainer,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,
         PieChart, Pie} from 'recharts';

import axios from 'axios'
import styled from 'styled-components';

import { Area } from '../charts/Charts'
import jsPDF from 'jspdf'


const Wrapper = styled.div`
  margin: auto;
  text-align: center;
  font-family: 'Montserrat', sans-serif;

  h1 {
    color: #939393;
  }

  .card-footer-info {
    padding: .75rem 1.25rem;
    background-color: transparent;
    border-top: 1px solid rgba(0,0,0,.125);
}
`

class Home extends Component {

  state = {
     dataAge : [],
     dataGender : [],
     stat : [],
     predictInfo : {}
  }

  componentDidMount() {
    axios.get('http://localhost:3000/dashboard/info')
      .then(res => {
        console.log("Test component did mount")
        console.log(res)
        this.setState({
          dataAge : res.data.age,
          dataGender : res.data.gender
        })

      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get('http://localhost:3000/dashboard/stat')
      .then(res => {
        this.setState({
          stat : res.data
        })
      })


      axios.get('http://localhost:3000/predict/info')
      .then(res => {
        this.setState({
           predictInfo : res.data
        })
      })


  }


  render() {

    const colName = ["Age","BMI","GammaGT*","Alk.Phosphatase*","ALT*","CEA*","CA19-9*"]
    
    return (
      <div>
        <ol class="breadcrumb">
          <li class="breadcrumb-item active">My Dashboard</li>
        </ol>

      <Wrapper>

      <div class="card mb-3">
          <div class="card-header">
             Summary
          </div>
          <div class="card-body">

        <table class="table">
          <tr> 
            <th></th>
              {colName.map(function(col, index){
                      return <th key={index} > {col} </th>
                })}
          </tr>
          
          {
            this.state.stat.map(function(row,index){
              return (
                  <tr key={index}>
                    <th scope="row">{row.stat}</th>
                      <td>{row.age}</td>
                      <td>{row.BMI}</td>
                      <td>{row.GammaGT}</td>
                      <td>{row.AlkPhosphatase}</td>
                      <td>{row.ALT}</td>
                      <td>{row.CEA}</td>
                      <td>{row.CA199}</td>
                  </tr>
              )
            })
          }

        </table>

        </div>
        <div className="card-footer-info small text-muted">* Normal range of GammaGT(9-48 U/L), Alkaline phosphatase(44-147 IU/L), ALT(7-56 U/L), CEA(equal or less than 3ng/mL), CA19-9(0-37 U/ml)</div>
          <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>      


        <div className="card w-75" style={{margin : 'auto'}} >
           <div className="card-header">
            <i className="fa fa-area-chart"></i> Age </div>
          	<BarChart width={600} height={300} data={this.state.dataAge}
            margin={{top: 5, right: 30, left: 100, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              {/* <Bar dataKey="noncholan" fill="#E975A0" /> */}
              <Bar dataKey="cholan" fill="#E975A0" />
            </BarChart>
            <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>

        </div>


          
          <div className="row" style={{marginTop:'20px'}}>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-block">
                <div className="card-header">
                <i className="fa fa-area-chart"></i> Gender
              </div>
  
              <div className="card-body">
                <PieChart width={800} height={400}>
                  <Pie isAnimationActive={true} data={this.state.dataGender} cx={200} cy={200} outerRadius={150} fill="#EB74A0" label/>
                  <Tooltip/>
                </PieChart>
              </div>
  
              <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card">
                  <div className="card-block">
                  <div className="card-header">
                    <i className="fa fa-area-chart"></i> Predictive Model
                  </div>
    
                 <div className="card-body">
                 <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Model</th>
                        <td>{this.state.predictInfo.model_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Accuracy</th>
                        <td>
                          { !this.state.predictInfo.accuracy ? 0 : 
                              this.state.predictInfo.accuracy.toFixed(2)
                          }
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Recall</th>
                        <td>
                          { !this.state.predictInfo.recall ? 0 : 
                            this.state.predictInfo.recall.toFixed(2)
                          }
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">F1</th>
                        <td>
                          { !this.state.predictInfo.f1 ? 0 : 
                            this.state.predictInfo.f1.toFixed(2)
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
    
                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                  </div>
                </div>
            </div>
          </div>



      </Wrapper>

      </div>
    )
  }
}

export default Home
