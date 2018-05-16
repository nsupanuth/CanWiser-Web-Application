import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components';

const ShowUpload = styled.div`

  text-align: center;
  font-family: 'Montserrat', sans-serif;

  h1 {
    color: #939393;
  }

  label {
    border: 2px solid #46b6a6;
    cursor: pointer;
    color: #46b6a6;
    border-radius: 60px;
    height: 30px;
    width: 150px;
  }

  .btn-success {
    color: #fff;
    background-color: #46b6a6;
    border-color: #46b6a6;
    width: 150px;
    height: 30px;
    border-radius: 50px;
    cursor: pointer;
}
`

const ShowScore = styled.p`
  color: #46b6a6;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  margin: auto;
  display: inline-block;
  margin: 0px 20px;

  .score {
    font-size: 25px;
    height: 150px;
    width: 150px;
    border: 3px solid #46b6a6;
    border-radius: 75px;
    padding-top: 55px !important;
  }

  .text {
    font-weight: bold;
    font-size: 20px;
  }
`

const ShowScoreNew = styled.div`
  width: 100%;
  margin: auto;

  .borderless {
    width: 50%;
    margin: auto;
  }

  .borderless td, .borderless th{
    // border: none;
  }
  `

class Home extends Component {

  state = {
    filename: '',
    uploadStatus: 'Upload',
    results: '',
  }

  handleFileChange() {
    this.setState({
      filename: this.refs.myFile.files[0].name,
      uploadStatus: 'Upload'
    })
    console.log(this.refs)
  }

  handleFileUpload() {

    const formData = new FormData(this.refs.myForm)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    this.setState({
      uploadStatus: 'Uploading...'
    })

    axios.post('http://localhost:3000/retrain/upload', formData, config)
      .then(res => {
        console.log(res)
        this.setState({
          results: res.data.results,
          uploadStatus: 'Upload',
          filename: ''
        })
      })
  }

  async handleModelCancle() {

    try {

      const res = await axios.post('http://localhost:3000/retrain/upload/cancel', {
        pathName: this.state.results.modelPath
      })

      console.log(res.data.status)
      this.setState({
        results: ''
      })

    } catch (error) {
      console.log(error)
    }

  }

  async handleModelSave() {

    try {

      await axios.post('http://localhost:3000/retrain/upload/confirm', {
        filePath: this.state.results.filePath,
        accuracy: this.state.results.accuracy,
        recall: this.state.results.recall,
        f1: this.state.results.f1,
        model_name: this.state.results.modelName,
        model_path: this.state.results.modelPath,
        dashboard: this.state.results.dashboard,
        stat: this.state.results.stat,
        features: this.state.results.features
      })

      this.setState({
        results: ''
      })


    } catch (error) {
      console.log(error)
    }

  }

  render() {

    return (
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">Upload</li>
        </ol>
        <ShowUpload>
          <h1 style={this.state.results ? { marginTop: 10 } : { marginTop: 200 }}>{this.state.results ? '' : 'Upload Your Data Here !'}</h1>

          {this.state.results ?
            <ShowScoreNew>
              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Model Name</th>
                    <th scope="col">F1</th>
                    <th scope="col">Accuracy</th>
                    <th scope="col">Recall</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.results.modelName}</td>
                    <td>{this.state.results.f1.toFixed(2)}</td>
                    <td>{this.state.results.accuracy.toFixed(2)}</td>
                    <td>{this.state.results.recall.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <table class="table table-bordered table-light borderless">
                <tbody>
                  <tr>
                    <td></td>
                    <td class="col-xs-4">
                      <strong> True Positive </strong>
                    </td>
                    <td class="col-xs-4">
                      <strong> True Negative </strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="col-xs-4">
                      <strong> Predicted Positive </strong>
                    </td>
                    <td class="col-xs-4">
                      <div id="true-positive" class="has-success" data-toggle="popover">
                        <p>10</p>
                      </div>
                    </td>
                    <td class="col-xs-4">
                      <div id="false-positive" class="has-warning" data-toggle="popover">
                        <p>10</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="col-xs-4">
                      <strong> Predicted Negative </strong>
                    </td>
                    <td class="col-xs-4">
                      <div id="false-negative" class="has-warning" data-toggle="popover">
                        <p>10</p>
                      </div>
                    </td>
                    <td class="col-xs-4">
                      <div id="true-negative" class="has-success" data-toggle="popover">
                        <p>10</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table class="table" style={{marginTop: 50}}>
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Measure</th>
                    <th scope="col">Value</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sensitivity</td>
                    <td>100</td>
                    <td>Sensitivity or True Positive Rate (TPR) </td>
                  </tr>
                  <tr>
                    <td>Specificity</td>
                    <td>100</td>
                    <td>Specificity (SPC) or True Negative Rate (TNR)  </td>
                  </tr>
                  <tr>
                    <td>Precision</td>
                    <td>100</td>
                    <td>Precision or Positive Predictive Value (PPV)</td>
                  </tr>
                  <tr>
                    <td>Negative Predictive Value </td>
                    <td>100</td>
                    <td>Negative Predictive Value (NPV) </td>
                  </tr>
                  <tr>
                    <td>False Positive Rate </td>
                    <td>100</td>
                    <td>Fall-out or False Positive Rate (FPR) </td>
                  </tr>
                  <tr>
                    <td>False Discovery Rate </td>
                    <td>100</td>
                    <td>False Discovery Rate (FDR)</td>
                  </tr>
                  <tr>
                    <td>False Negative Rate </td>
                    <td>100</td>
                    <td>Miss Rate or False Negative Rate (FNR) </td>
                  </tr>
                  <tr>
                    <td>Accuracy </td>
                    <td>100</td>
                    <td>Accuracy (ACC)  </td>
                  </tr>
                  <tr>
                    <td>F1 Score </td>
                    <td>100</td>
                    <td>F1 Score (F1)  </td>
                  </tr>
                  <tr>
                    <td>Matthews Correlation Coefficient </td>
                    <td>100</td>
                    <td>Matthews Correlation Coefficient (MCC) </td>
                  </tr>
                </tbody>
              </table>

            </ShowScoreNew>
            : ''}

          {/* {this.state.results ? <ShowScore><p className="score">{this.state.results ? this.state.results.f1.toFixed(2) : ''}</p><p className="text">{this.state.results ? 'F1' : ''}</p></ShowScore> : ''}
          {this.state.results ? <ShowScore><p className="score">{this.state.results ? this.state.results.accuracy.toFixed(2) : ''}</p><p className="text">{this.state.results ? 'Accuracy' : ''}</p></ShowScore> : ''}
          {this.state.results ? <ShowScore><p className="score">{this.state.results ? this.state.results.recall.toFixed(2) : ''}</p><p className="text">{this.state.results ? 'Recall' : ''}</p></ShowScore> : ''}
          {this.state.results ? <ShowScore><p className="score">{this.state.results ? this.state.results.modelName : ''}</p><p className="text">{this.state.results ? 'Model Name' : ''}</p></ShowScore> : ''} */}
          <form ref="myForm">
            <input ref="myFile" name="xxx" id="file" onChange={() => this.handleFileChange()} type="file" style={{ display: 'none' }} />
            <label htmlFor="file"><span style={{ marginTop: 100 }}>Choose a file</span></label> {this.state.filename}
          </form>
          <div style={{marginTop: 20, marginBottom: 50}}>
          {this.state.filename ? <button style={{display: 'block', margin: 'auto', marginBottom: 20}} onClick={() => this.handleFileUpload()} className="button btn-success">{this.state.uploadStatus}</button> : ''}
          {this.state.results ? <button type="button" style={{ marginRight: '20px', backgroundColor: '#E46B96', borderColor: '#E46B96' }} onClick={() => this.handleModelCancle()} className="btn btn-danger">Cancle</button> : ''}
          {this.state.results ? <button type="button" style={{backgroundColor: '#4BB6A6', borderColor: '#4BB6A6'}} onClick={() => this.handleModelSave()} className="btn btn-primary">Save</button> : ''}
          </div>

        </ShowUpload>

      </div>
    )
  }
}

export default Home
