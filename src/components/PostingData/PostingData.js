import React, { Component } from "react";
import * as actions from '../../store/actions/DataPosting'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import "./PostingData.css";
class PostData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobtype: "",
      CompanyName: "",
      role: "",
      description: "",
      ApplicationLink:""
    };
    this.SubmitHandler = this.SubmitHandler.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  SubmitHandler = (event) => {
    event.preventDefault();
    
    console.log(this.props.status);

const data={
  jobtype:this.state.jobtype,
  CompanyName: this.state.CompanyName,
  role:this.state.role,
  description:this.state.description,
  ApplicationLink:this.state.ApplicationLink,
}
this.props.onPostData(data,localStorage.getItem('token'));
event.target.reset();

}
  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
  if(this.props.status===200)
  {
    setTimeout(()=>window.location.reload(),1000)
   
  }
 
    let  postData=(
          <div style={{fontWeight:'600',marginLeft:'9rem',fontSize:'25px',color:'purple'}}>
            DATA POSTED SUCCESSFULLY!!
            </div>
          
          
        )
    return (
      <React.Fragment>
        {/*
        <header className="post-header">
          <h1>POST JOBS AND INTERNSHIPS</h1>
      </header>*/}
       
        <form id="formData" onSubmit={this.SubmitHandler}>
          <div className="form-container">
          {this.props.status?postData:this.props.loading?<Spinner/>:null}<br/>
            <section className="Job-Type">
            
              <label htmlFor="jobtype">JOB
              <input
                 required
                type="radio"
                id="jobtype"
                name="jobtype"
                value="JOB"
                onChange={this.handleInput}
              /></label>
              <label htmlFor="jobtypeI">INTERNSHIP
              <input
                 required
                type="radio"
                id="jobtypeI"
                name="jobtype"
                value="INTERNSHIP"
                onChange={this.handleInput}
              /></label>
            </section>

            <section className="Company-name">
              <label htmlFor="CompanyName">Enter Company Name</label>
                <input
                required
                type="text"
                id="CompanyName"
                name="CompanyName"
                value={this.state.CompanyName}
                onChange={this.handleInput}
              ></input>
              <label htmlFor="ApplicationLink">Enter Application Link</label>
                <input
                required
                type="text"
                id="ApplicationLink"
                name="ApplicationLink"
                value={this.state.ApplicationLink}
                onChange={this.handleInput}
              ></input>
              <label htmlFor="role">Enter JOB ROLE</label>
                <input
                required
                type="text"
                id="role"
                name="role"
                value={this.state.role}
                onChange={this.handleInput}
              ></input>
            </section>

            <section className="Company-Desc">
              <label htmlFor="Company-Description">Company Description</label>
              <textarea
                required
                id="Company-Description"
                value={this.state.description}
                rows="4"
                cols="50"
                name="description"
                onChange={this.handleInput}
              />
            </section>
            <button className="upload" type="submit">UPLOAD</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    status:state.data.status,
    loading:state.data.loading,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onPostData:(data,token)=>dispatch(actions.postjob(data,token))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostData);
