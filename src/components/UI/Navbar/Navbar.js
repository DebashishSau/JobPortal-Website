import React,{Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom'
import * as actions from '../../../store/actions/auth'
import {connect} from 'react-redux'
import Logo from '../../../assets/Images/apple-touch-icon.png'
import {Navbar,Nav} from "react-bootstrap";
import './Navbar.css';
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class navbar extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      logout:false
    }
    this.Handlelogout=this.Handlelogout.bind(this);
  }
  Handlelogout=()=>{
    this.props.onLogout()
  this.setState({
    logout:true
  })
  
  }
  render() {
    let user=localStorage.getItem('userId');
    if(this.state.logout)
    {
    return <Redirect to="/"/>
    }
    return (
      <React.Fragment>
        <Navbar collapseOnSelect expand="lg" >
          <Navbar.Brand href="/"><img src={Logo} alt="logo" style={{height:'50px',width:'50px'}}/>IVENTORS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
           {/* <Nav.Link href="/auth"><i class="fa fa-user" aria-hidden="true"></i> Register/Login</Nav.Link>
              
    */}
            </Nav>
            <Nav >
            {/* <Nav.Link href="#">link</Nav.Link>
              <Nav.Link href="#">link</Nav.Link> */}
              <Nav.Link href="/"><i className="fa fa-id-card" aria-hidden="true"></i>Jobs/Internships</Nav.Link>
              {user?<Nav.Link href={`/${user}/postdata`}><i className="fa fa-briefcase" aria-hidden="true"></i> POST Jobs&#47;Internships</Nav.Link>:null}
             {user?<Nav.Link onClick={this.Handlelogout}><i className="fa fa-sign-out" aria-hidden="true"></i>LOGOUT</Nav.Link>:<Nav.Link href="/auth"><i className="fa fa-user" aria-hidden="true"></i>Login(Admin)</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
      </React.Fragment>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onLogout:()=>dispatch(actions.logout()),
    redirectpath:()=>dispatch(actions.setAuthRedirectPath())
  }
}
export default connect(null,mapDispatchToProps)(navbar);
