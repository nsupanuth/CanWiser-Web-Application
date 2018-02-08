import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,
         PieChart, Pie} from 'recharts';

import axios from 'axios'
import { Area } from '../charts/Charts'


// const dataAge = [
//   {name: '0-15', noncholan : 400, cholan: 1 },
//   {name: '16-30', noncholan: 300, cholan: 20 },
//   {name: '31-50', noncholan: 500, cholan: 10 },
//   {name: '60++', noncholan: 450, cholan: 0 }
// ];

// const dataPie = [
//     {name: 'Male', value: 2400}, 
//     {name: 'Female', value: 4567}
// ];

class Home extends Component {

  state = {
     dataAge : [],
     dataGender : []
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

  }


  render() {

    return (
      <div>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">My Dashboard</li>
        </ol>

      	
        <div className="card w-75" style={{marginBottom:'20px'}} >
           <div class="card-header">
            <i class="fa fa-area-chart"></i> Bar Chart Example</div>
          <BarChart width={600} height={300} data={this.state.dataAge}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="noncholan" stackId="a" fill="#EB74A0" />
            <Bar dataKey="cholan" stackId="a" fill="#4ABFC6" />
          </BarChart>
        </div>

      <div className="card w-50" style={{marginBottom:'20px'}}>
        <div class="card-header">
            <i class="fa fa-area-chart"></i> Pie Chart Example
        </div>

        <div className="card-body">
          <PieChart width={800} height={400}>
            <Pie isAnimationActive={true} data={this.state.dataGender} cx={200} cy={200} outerRadius={130} fill="#EB74A0" label/>
            {/* <Pie data={dataPie} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/> */}
            <Tooltip/>
          </PieChart>
        </div>

      </div>

        

        <div class="card mb-3">
          <div class="card-header">
            <i class="fa fa-area-chart"></i> Area Chart Example</div>
          <div class="card-body">
            <Area />
          </div>
          <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>


      </div>
    )
  }
}

export default Home
