import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
export const authStart=()=>{
    return{
        type:actionTypes.Auth_START
    }
}
export const authSuccess=(token,userID)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        userID:userID,
        token:token
    }
}
export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
} 
export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    };
}
export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*100000);
    }
}
export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAH-rHwkn7mffA5aTHWlrJaxDejFSpP6kg';
        // if (!isSignup) {
        //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAH-rHwkn7mffA5aTHWlrJaxDejFSpP6kg';
        // }
       axios.post(url,authData)
       .then(response=>{
           console.log(response);
           const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
           localStorage.setItem('token',response.data.idToken);
           localStorage.setItem('expirationDate',expirationDate);
           localStorage.setItem('userId',response.data.localId);
           dispatch(authSuccess(response.data.idToken,response.data.localId));
           dispatch(checkAuthTimeout(response.data.expiresIn));
        }) 
        .catch(err=>{
            dispatch(authFail(err.response.data.error))
        })
    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
};
export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate<=new Date()){
                dispatch(logout);
            }
            else{
                const userID=localStorage.getItem('userId');
                dispatch(authSuccess(token,userID));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date.getTime())/1000))
            }
        }
    }
}
