import React, { Component } from "react";
import { connect } from "react-redux";
import './JobListing.css'
import * as actions from "../../store/actions/DataPosting";
class joblistings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobtype: "JOB",
      CompanyName: "Vestro Solvents Pvt Ltd:",
      role: "Head of Finance and Accounting",
      description:
        "Vestro Solvents Pvt Ltd\nHyderabad, Telangana, India\nProviding leadership, direction and management of the present accounts team.\nOverseeing the preparation of all accounts and financial reports\nMIS - Management Information Systems\nAssist with high-level decisions about policy and strategy.\nIf necessary, recruiting new accounts staff or removing present staff\nIdentify and address financial risks and opportunities for the company.\nJob Requirements:\nStrong Financial and Accounts Background including Cost Accounting and Budgeting.\nStrong Knowledge with regards to SAP B1 or similar ERP services.\nAbility to understand new issues quickly and make wise decisions\nAbility to delegate work effectively and efficiently, and motivate subordinates\nSeniority level:Executive\nIndustry:Chemicals. Pharmaceuticals\nEmployment type:Full-time\nJob functions:Finance. Sales. Accounting/Auditing",
      ApplicationLink: "https://www.linkedin.com/jobs/view/1952756004",
    };
  }
  componentDidMount() {
    this.props.onGetJobs();
  }
  render() {
   
   let alljobs=null
   if(this.props.getstatus)
   {
    alljobs=
      this.props.jobs.map(job=>{
        return(
          <div id='job-details' key={job.id}>
          <div className='job-intern'>
            <h6>{job.jobtype}</h6>
            <h4>{job.role}</h4>
            <h5>{job.CompanyName}</h5>
            <details><summary>Description :</summary><p>
            {job.description.split('\n').map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br/>
                </span>
              )
            })}</p>
            </details>
            <a className="apply" href={job.ApplicationLink} target="_blank">Apply Now</a>
          </div>
  
          </div>
        )
      })
    } 
    
    return (
      <React.Fragment>
      {/* <div id='job-details'>
        <div className='job-intern'>
          <h6>{this.state.jobtype}</h6>
          <h4>{this.state.role}</h4>
          <h5>{this.state.CompanyName}</h5>
          <details><summary>Description :</summary><p>
          {this.state.description.split('\n').map(function(item, key) {
            return (
              <span key={key}>
                {item}
                <br/>
              </span>
            )
          })}</p>
          </details>
          <a className="apply" href={this.state.ApplicationLink} target="_blank">Apply Now</a>
        </div>

        </div> */}
        {alljobs}
      </React.Fragment>
    );
  }
}
const mapStateToProps=(state)=>{
    return{
      getstatus:state.data.getstatus,
      jobs:state.data.jobs 
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetJobs: () => dispatch(actions.getjob()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(joblistings);
