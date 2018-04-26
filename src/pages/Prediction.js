import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components';
import jsPDF from 'jspdf'

const Wrapper = styled.div`

  width: 70%;
  margin: auto;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  padding-bottom: 40px;

  h1 {
    color: #939393;
  }

  .btn-primary {
    background-color: #3AB7C0;
    border-color: #3AB7C0;
  }

  .btn-primary:hover {
    cursor: pointer;
  }

  .btn-danger {
    background-color: #E66996;
    border-color: #E66996;
  }
`

const RecommendStyle = styled.div`

  font-family: 'Kanit', sans-serif;
  font-size : 45px;
`

class Prediction extends Component {

  state = {
    patientNo: '',
    gender: 0,
    patientName: '',
    age: '',
    height: '',
    weight: '',
    smoke : 1,
    phy6_2_5_vs1: 1,
    phy6_2_12_vs1: 1,
    phy9_3_6_vs1: 1,
    phy2_5_vs1: 1,
    phy8_1_3_vs1: 1,
    phy5_5_vs1: 1,
    alkPhosphatase: 0,
    gammaGT : 0,
    ALT: 0,
    CEA: 0,
    CA199: 0,
    proba : 0,
    dataAge : [],
    dataGender : [],
    stat : [],
    predictInfo : {},
    recommends : [],
    recommendCluster : []
  }

  updateValue = (e) => {
    let value = e.target.value
    if (e.target.id === 'gender') {
      if (e.target.value === 'Male') value = 0
      else value = 1
    }

    if(e.target.id === 'phy6_2_5_vs1' || e.target.id === 'smoke' || e.target.id === 'phy6_2_12_vs1' || e.target.id === 'phy9_3_6_vs1' ||
       e.target.id === 'phy2_5_vs1' || e.target.id === 'phy8_1_3_vs1' || e.target.id === 'phy5_5_vs1' )
    { 
      e.target.value === 'เคย' ? value = 1 : value = 0;
    }

    this.setState({
      [e.target.id]: parseInt(value)
    })
  }

  handlePostForRecommend(){
    
    const { recommend } = this.state

    const {patientNo,gender,age,height,weight,smoke,
      phy6_2_5_vs1,phy6_2_12_vs1,phy9_3_6_vs1,phy2_5_vs1,phy8_1_3_vs1,phy5_5_vs1,
      alkPhosphatase,gammaGT,ALT,CEA,CA199} = this.state

    axios.post('http://localhost:3000/predict/test/cholan', {
      patientNo, gender, age, height, weight,
      phy6_2_5_vs1, phy6_2_12_vs1, phy9_3_6_vs1, phy2_5_vs1, phy8_1_3_vs1, phy5_5_vs1,
      alkPhosphatase, gammaGT, ALT, CEA, CA199
    })
    .then(res => {

      this.setState({
        proba : res.data.results.proba
      })

      if(age > 50){
        this.setState({
          recommends : [...this.state.recommends,"ควรตรวจสุขภาพทุกครึ่งปี"]
        })
      }
      if(phy2_5_vs1 === 1){
        this.setState({
          recommends : [...this.state.recommends,"งดสูบบุหรี่"]
        })
      }
      if(phy6_2_5_vs1 == 1){
        this.setState({
          recommends : [...this.state.recommends,"ควรลดอาหารที่มีโซเดียมสูง"]
        })
      }

      this.setState({
        recommends : [...this.state.recommends,'รับประทานอาหารดิบๆให้น้อยลง','ควรออกกำลังกายอย่างสม่ำเสมอ','พักผ่อนให้เพียงพอ','อย่าลืมล้างมือก่อนรับประทานอาหาร']
      })

      if(this.state.proba > 0.5){
        axios.post('http://localhost:3000/predict/test/clustering', {
          gender, age, height, weight,
          phy6_2_5_vs1, phy6_2_12_vs1, phy9_3_6_vs1, phy2_5_vs1, phy8_1_3_vs1, phy5_5_vs1,
          alkPhosphatase, gammaGT, ALT, CEA, CA199
        }).then(res => {
          console.log(res)
        }).catch(function (error){
          console.log(error)
        })

      }
      
      if(this.state.proba > 0.7){
        recommends : [...this.state.recommends,"ควรพบแพทย์หรือตรวจเพิ่มเติม"]
      }

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  SaveAsPDF = () => {
    axios.get('http://localhost:3000/dashboard/stat')
      .then(res => {
        this.setState({
          stat: res.data
        })

        const doc = new jsPDF();
        var today = new Date();
        doc.setFont("courier");
        doc.setFontSize(10)
        doc.text(205, 7, today.toDateString(), null, null, 'right');
        doc.setFontSize(40)
        doc.setFontType('bold')
        doc.text(105, 25, 'CanWiser', null, null, 'center');
        doc.setFontSize(10)
        doc.setFontType('normal')
        doc.text(105, 32, 'A Smart Web Application Platform For Cancer Analytics.', null, null, 'center');
        doc.setLineWidth(1.5);
        doc.line(200, 38, 10, 38);

        doc.setFontSize(15)
        doc.text(105, 50, 'SUMMARY STANDARD ANALYTICS', null, null, 'center');
        doc.setLineWidth(0.5);
        doc.line(146, 52, 64, 52);

        doc.setFontSize(13)
        doc.text(50, 60, 'AGE');
        doc.text(65, 60, 'BMI');
        doc.text(80, 60, 'GammaGT');
        doc.text(105, 60, 'ALKPhosphatase');
        doc.text(150, 60, 'ALT');
        doc.text(163, 60, 'CEA');
        doc.text(177, 60, 'CA19-9');

        doc.text(20, 70, 'MEAN');
        doc.text(20, 78, 'MEDIAN');
        doc.text(20, 86, 'MAX');
        doc.text(20, 94, 'MIN');
        doc.setFontSize(7)
        doc.text(5, 100, '* Normal range of GammaGT(9-48 U/L), Alkaline phosphatase(44-147 IU/L), ALT(7-56 U/L), CEA(equal or less than 3ng/mL), CA19-9(0-37 U/ml)');

        doc.setFontSize(10)
        doc.text(50, 70, this.state.stat[0].age.toString());
        doc.text(65, 70, this.state.stat[0].BMI.toString());
        doc.text(80, 70, this.state.stat[0].GammaGT.toString());
        doc.text(105, 70, this.state.stat[0].AlkPhosphatase.toString());
        doc.text(150, 70, this.state.stat[0].ALT.toString());
        doc.text(163, 70, this.state.stat[0].CEA.toString());
        doc.text(177, 70, this.state.stat[0].CA199.toString());

        doc.text(50, 78, this.state.stat[1].age.toString());
        doc.text(65, 78, this.state.stat[1].BMI.toString());
        doc.text(80, 78, this.state.stat[1].GammaGT.toString());
        doc.text(105, 78, this.state.stat[1].AlkPhosphatase.toString());
        doc.text(150, 78, this.state.stat[1].ALT.toString());
        doc.text(163, 78, this.state.stat[1].CEA.toString());
        doc.text(177, 78, this.state.stat[1].CA199.toString());

        doc.text(50, 86, this.state.stat[2].age.toString());
        doc.text(65, 86, this.state.stat[2].BMI.toString());
        doc.text(80, 86, this.state.stat[2].GammaGT.toString());
        doc.text(105, 86, this.state.stat[2].AlkPhosphatase.toString());
        doc.text(150, 86, this.state.stat[2].ALT.toString());
        doc.text(163, 86, this.state.stat[2].CEA.toString());
        doc.text(177, 86, this.state.stat[2].CA199.toString());

        doc.text(50, 94, this.state.stat[3].age.toString());
        doc.text(65, 94, this.state.stat[3].BMI.toString());
        doc.text(80, 94, this.state.stat[3].GammaGT.toString());
        doc.text(105, 94, this.state.stat[3].AlkPhosphatase.toString());
        doc.text(150, 94, this.state.stat[3].ALT.toString());
        doc.text(163, 94, this.state.stat[3].CEA.toString());
        doc.text(177, 94, this.state.stat[3].CA199.toString());

        doc.setLineWidth(1.5);
        doc.line(200, 105, 10, 105);

        doc.setFontSize(15)
        doc.text(105, 115, 'SUMMARY PREDICTIVE MODEL', null, null, 'center');
        doc.setLineWidth(0.5);
        doc.line(143, 117, 67, 117);

        doc.setFontSize(15)
        doc.text(20, 185, 'PATIENT NO.:');
        doc.text(20, 193, 'PATIENT NAME:');
        doc.text(20, 201, 'GENDER:');
        doc.text(20, 209, 'AGE:');
        doc.text(20, 217, 'HEIGHT:');
        doc.text(20, 225, 'WEIGHT:');
        doc.text(20, 233, 'GammaGT:');
        doc.text(20, 241, 'alkPhosphatase:');
        doc.text(20, 249, 'ALT:');
        doc.text(20, 257, 'CEA:');
        doc.text(20, 265, 'CA199:');
        doc.text(20, 273, 'CHANCE:');

        doc.setFontSize(13)
        doc.text(20, 130, 'MODEL');
        doc.text(20, 138, 'ACCURACY');
        doc.text(20, 146, 'RECALL');
        doc.text(20, 154, 'F1');

        doc.setFontSize(13)
        doc.text(50, 130, 'Random forest');
        doc.text(50, 138, '0.8574126534466477');
        doc.text(50, 146, '0.5025122216186855');
        doc.text(50, 154, '0.46811355585491193');

        doc.setLineWidth(0.5);
        doc.line(200, 165, 10, 165);

        doc.setFontSize(15)
        doc.text(105, 175, 'PATIENT PART', null, null, 'center');
        doc.setLineWidth(0.5);
        doc.line(124, 177, 86, 177);

        doc.setFontSize(13)
        doc.text(70, 185, this.state.patientNo.toString());
        doc.text(70, 193, this.state.patientName.toString());
        doc.text(70, 201, this.state.gender ? 'FEMALE' : 'MALE');
        doc.text(70, 209, this.state.age.toString());
        doc.text(70, 217, this.state.height.toString());
        doc.text(70, 225, this.state.weight.toString());
        doc.text(70, 233, this.state.gammaGT.toString()+'(9-48 U/L)');
        doc.text(70, 241, this.state.alkPhosphatase.toString()+'(44-147 IU/L)');
        doc.text(70, 249, this.state.ALT.toString()+'(7-56 U/L)');
        doc.text(70, 257, this.state.CEA.toString()+'(equal or less than 3ng/mL)');
        doc.text(70, 265, this.state.CA199.toString()+'(0-37 U/ml)');
        doc.text(70, 273, this.state.proba.toString());

        doc.setFontSize(15)
        doc.text(20, 281, 'Note:');
        doc.setLineWidth(0.3);
        doc.line(35, 281, 200, 281);
        doc.line(35, 289, 200, 289);

        doc.text(120, 209, 'RECOMMENDATION');
        doc.setLineWidth(0.5);
        doc.line(120, 211, 162, 211);

        doc.setFontSize(12)
        doc.text(120, 217, '- NO SMOKING');
        doc.text(120, 225, '- KIN ARHARN KROB 5 MU');
        doc.text(120, 233, '- KIN PUK BAI KEOW');
        doc.text(120, 241, '- NON HAI TONG VERA');

        doc.save('Results.pdf');

      })

      .catch(function (error) {
        console.log(error);
      })
  }

  render() {

    return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active">Prediction</li>
      </ol>
      <Wrapper>
        <h1 style={{ marginTop: 30 }}>Fill Your Data Here !</h1>
        <form>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Patient Number</label>
            <input type="text" class="form-control" id="patientNo" placeholder="Number Only" onChange={this.updateValue} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Patient Name</label>
            <input type="text" class="form-control" id="patientName" onChange={this.updateValue} />
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

      <RecommendStyle style={{fontSize:'16px'}}>
          <div class="form-group">
            <label for="exampleFormControlSelect1">ประวัติการเป็นโรคความดันโลหิตสูง</label>
            <select class="form-control" id="phy6_2_5_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">ประวัติการเป็นโรคตับ</label>
              <select class="form-control" id="phy6_2_12_vs1" onChange={this.updateValue}>
                <option>เคย</option>
                <option>ไม่เคย</option>
              </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">ประวัติการเป็นโรคหัวใจ</label>
            <select class="form-control" id="phy9_3_6_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">ประวัติการสูบบุหรี่</label>
            <select class="form-control" id="phy2_5_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">ประวัติการฉีดวัคซีนพิษสุนัขบ้า</label>
            <select class="form-control" id="phy8_1_3_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">ประวัติการตั้งครรภ์</label>
            <select class="form-control" id="phy5_5_vs1" onChange={this.updateValue}>
              <option>เคย</option>
              <option>ไม่เคย</option>
            </select>
          </div>
      </RecommendStyle>

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
              <button type="button" onClick={() => {this.setState({recommends : [],proba : 0})}} className="close" data-dismiss="modal">&times;</button>
            </div>
            
            <RecommendStyle>

              <div className="modal-body">
                <p> <b>โอกาสเป็นมะเร็งท่อน้ำดี : { !this.state.proba == 0 ? (this.state.proba*100).toFixed(2) : 0}%  </b></p>

                <ul style={{fontSize:'35px'}}>
                  {this.state.recommends.map(function(recommend, index){
                      return <div key={ index }> <i style={{color : '#dfe81f'}} className="fa fa-star"></i> {recommend} </div>
                    })}
                  {this.state.proba > 0.7 ? <div style={{color : 'red'}}>**ควรพบแพทย์หรือตรวจเพิ่มเติม**</div>: ''}
                </ul>
                  <div style={{fontSize:'20px'}}>หมายเหตุ : เป็นแค่การวินิฉัยในเบื้องต้นจากการวิเคราะห์ข้อมูลทางสถิติเท่านั้น</div> 
              </div>
        
            </RecommendStyle>

                

            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => this.SaveAsPDF()}>Save As PDF</button>
              <button type="button" className="btn btn-danger" 
                onClick={() => {this.setState({recommends : [],proba : 0})}} data-dismiss="modal">Close</button>
            </div>
          
            </div>
            
          </div>
          </div>
        </Wrapper>     
      </div>

    )
  }
}

export default Prediction
