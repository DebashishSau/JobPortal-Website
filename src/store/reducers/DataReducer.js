import * as actiontypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initalState={
    jobs:[],
    loading:false,
    token:null,
    status:'',
    getstatus:'',
}
const postjobStart=(state,action)=>{
  return updateObject(state,{
    loading:true
  })
}
const postjobFail=(state,action)=>{
  return updateObject(state,{
    loading:false
  })
}
const postjob=(state,action)=>{
return updateObject(state,{
    status:action.status,
    token:action.token
})
}

const getjobStart=(state,action)=>{
  return updateObject(state,{
    loading:true
  })
}
const getjobFail=(state,action)=>{
  return updateObject(state,{
    loading:false
  })
}
const getjob=(state,action)=>{
return updateObject(...state,{
    jobs:action.getdata,
    getstatus:action.getstatus
})
}
const dataReducer=(state=initalState,action)=>{
  switch(action.type)
  {
      case actiontypes.POST_SUCCESS:return postjob(state,action);
      case actiontypes.POST_FAIL:return postjobFail(state,action);
      case actiontypes.POST_START:return postjobStart(state,action);

      case actiontypes.GET_SUCCESS:return getjob(state,action);
      case actiontypes.GET_FAIL:return getjobFail(state,action);
      case actiontypes.GET_START:return getjobStart(state,action);
      default:return state
  }
}
export default dataReducer;