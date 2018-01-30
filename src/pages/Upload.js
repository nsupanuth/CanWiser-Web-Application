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
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    }

    this.setState({
      uploadStatus: 'Uploading'
    })

    axios.post('http://13.229.135.29:8080/retrain/upload', formData, config)
      .then(res => {
        console.log(res)
        this.setState({
          results: res.data.results,
          uploadStatus: 'Upload',
          filename: ''
        })
      })
  }

  handleModelCancle() {
    axios.post('http://13.229.135.29:8080/retrain/upload/cancel', {
      pathName: this.state.results.modelPath
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleModelSave() {
    axios.post('http://13.229.135.29:8080/retrain/upload/confirm', {
      accuracy: this.state.results.accuracy,
      recall: this.state.results.recall,
      f1: this.state.results.f1,
      model_name: this.state.results.modelName,
      model_path: this.state.results.modelPath
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    return (
      <div>
        <ol class="breadcrumb">
          <li class="breadcrumb-item active">Upload</li>
        </ol>
        <ShowUpload>
          <h1 style={this.state.results ? { marginTop: 100 } : { marginTop: 200 }}>Upload Your Data Here !</h1>
          {this.state.results ? <ShowScore><p class="score">{this.state.results ? this.state.results.f1.toFixed(2) : ''}</p><p class="text">{this.state.results ? 'F1' : ''}</p></ShowScore> : ''}
          {this.state.results ? <ShowScore><p class="score">{this.state.results ? this.state.results.accuracy.toFixed(2) : ''}</p><p class="text">{this.state.results ? 'Accuracy' : ''}</p></ShowScore> : ''}
          {this.state.results ? <ShowScore><p class="score">{this.state.results ? this.state.results.recall.toFixed(2) : ''}</p><p class="text">{this.state.results ? 'Recall' : ''}</p></ShowScore> : ''}
          {this.state.results ? <ShowScore><p class="score">{this.state.results ? this.state.results.modelName : ''}</p><p class="text">{this.state.results ? 'Model Name' : ''}</p></ShowScore> : ''}
          <form ref="myForm">
            <input ref="myFile" name="xxx" id="file" onChange={() => this.handleFileChange()} type="file" style={{ display: 'none' }} />
            <label for="file"><span style={{ marginTop: 100 }}>Choose a file</span></label> {this.state.filename}
          </form>
          {/* {this.state.results ? <button onClick={() => this.handleModelCancle()} className="button btn-danger">Cancle</button> : ''}
          {this.state.results ? <button onClick={() => this.handleModelSave()} className="button btn-primary">Save</button> : ''} */}
          {this.state.filename ? <button onClick={() => this.handleFileUpload()} className="button btn-success">{this.state.uploadStatus}</button> : ''}
        </ShowUpload>
      </div>
    )
  }
}

export default Home
