import React, { Component } from 'react';

import axios from 'axios'

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
      uploadStatus: 'Uploading'
    })

    axios.post('http://13.229.135.29:8080/retrain/upload', formData, config)
      .then(res => {
        console.log(res)
        this.setState({
          results: res.data.results,
          uploadStatus: 'Upload'
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
      <div className="box">
        <p> {this.state.filename} </p>
        <form ref="myForm">
          <input ref="myFile" name="xxx" onChange={() => this.handleFileChange()} type="file" />
        </form>
        <button onClick={() => this.handleFileUpload()} className="button btn-success">{this.state.uploadStatus}</button>
        <p>{this.state.results ? 'F1: ' : ''} {this.state.results ? this.state.results.f1 : ''}</p>
        <p>{this.state.results ? 'Accuracy: ' : ''} {this.state.results ? this.state.results.accuracy : ''}</p>
        <p>{this.state.results ? 'Features: ' : ''} {this.state.results ? this.state.results.features : ''}</p>
        <p>{this.state.results ? 'Model Name: ' : ''} {this.state.results ? this.state.results.modelName : ''}</p>
        {/* <p>{this.state.results ? this.state.results.modelPath : ''}</p> */}
        <p>{this.state.results ? 'Recall: ' : ''} {this.state.results ? this.state.results.recall : ''}</p>

        {this.state.results ? <button onClick={() => this.handleModelCancle()} className="button btn-danger">Cancle</button>: ''}
        {this.state.results ? <button onClick={() => this.handleModelSave()} className="button btn-primary">Save</button>: ''}

      </div>
    )
  }
}

export default Home
