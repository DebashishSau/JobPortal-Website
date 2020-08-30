import React,{Component} from 'react';
import * as actions from '../../store/actions/auth'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import './Auth.css'
class login extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            email:'',
            password:'',
            isSignUp:true
        }
         this.handleSubmit=this.handleSubmit.bind(this);
         this.handleInput=this.handleInput.bind(this);
         this.switchAuth=this.switchAuth.bind(this);
    }
    switchAuth=()=>{
        this.setState(prevState=>
            {
                return {
                    isSignUp:!prevState.isSignUp
                }
            }
        )
    }
    handleSubmit(event)
    {
        event.preventDefault();
        this.props.onAuth(this.state.email,this.state.password,this.state.isSignUp)
      event.target.reset();
    }
    handleInput(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render(){
        let tok=localStorage.getItem('token')
        let id=localStorage.getItem('userId')
        if(tok)
        {
            return <Redirect to={`/${id}/postData`}/>
        }
        return(
            <React.Fragment>
                {/* <Navbar/> */}
                <form id="AuthForm" onSubmit={this.handleSubmit}>
                <div className="Login">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" name="email" value={this.state.email} onChange={this.handleInput} required/>
                    <label htmlFor="email">Password:</label>
                    <input type="password" name="password" value={this.state.password} minLength="8" onChange={this.handleInput} required/>
                    <button type="submit">LOGIN</button>
                    </div>
                    </form>
                {/* <button id="signbtn" onClick={this.switchAuth}>"LOG IN"</button> */}
                </React.Fragment>
        )
    }
}
const mapStateToprops=(state)=>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToprops=(dispatch)=>{
    return{
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    }
}
export default connect(mapStateToprops,mapDispatchToprops)(login);