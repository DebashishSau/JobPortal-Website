import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const initialState={
    token:null,
    userID:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
    
}
const authStart=(state,action)=>{
    return updateObject(state,{error:null,loading:true})

}
const authSuccess=(state,action)=>{
    return updateObject(state,{
        token:action.token,
        userID:action.userID,
        error:null,
        loading:false
    })
};
const authFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    })
}
const authLogout=(state,action)=>{
    
 return updateObject(state,{token:null,userID:null})
    
}
const setAuthRedirectPath=(state,action)=>{
    return updateObject(state,{authRedirectPath:action.path})
}
const authReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.Auth_START:return authStart(state,action);
        case actionTypes.AUTH_FAIL:return authFail(state,action);
        case actionTypes.AUTH_LOGOUT:return authLogout(state,action);
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:return setAuthRedirectPath(state,action);
        default:return state;
    }
}
export default authReducer;