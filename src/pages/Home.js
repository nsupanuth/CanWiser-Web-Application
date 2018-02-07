import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { Area } from '../charts/Charts'

// const chartData = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       fillColor: "rgba(220,220,220,0.2)",
//       strokeColor: "rgba(220,220,220,1)",
//       pointColor: "rgba(220,220,220,1)",
//       pointStrokeColor: "#fff",
//       pointHighlightFill: "#fff",
//       pointHighlightStroke: "rgba(220,220,220,1)",
//       data: [65, 59, 80, 81, 56, 55, 40]
//     },
//     {
//       label: "My Second dataset",
//       fillColor: "rgba(151,187,205,0.2)",
//       strokeColor: "rgba(151,187,205,1)",
//       pointColor: "rgba(151,187,205,1)",
//       pointStrokeColor: "#fff",
//       pointHighlightFill: "#fff",
//       pointHighlightStroke: "rgba(151,187,205,1)",
//       data: [28, 48, 40, 19, 86, 27, 90]
//     }
//   ]
// }

const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000}
];

class Home extends Component {

  render() {

    return (
      <div>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">My Dashboard</li>
        </ol>

      	
        <div className="card w-75">
           <div class="card-header">
            <i class="fa fa-area-chart"></i> Bar Chart Example</div>
          <BarChart width={600} height={300} data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="amt" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>
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
