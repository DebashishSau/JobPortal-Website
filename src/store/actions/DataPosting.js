import * as actionTypes from './actionTypes'
import axios from 'axios';
export const getjobstart=()=>{
    return{
        type:actionTypes.GET_START,
       
    }
}
export const getjobFail=(error)=>{
    return{
        type:actionTypes.GET_FAIL,
        error:error
    }
}
export const getjobSuccess=(getdata,getstatus)=>{
    return{
        type:actionTypes.GET_SUCCESS,
        getdata:getdata,
        getstatus:getstatus
    }
}

export const getjob=()=>{
    return dispatch=>{
        dispatch(getjobstart());
        axios.get("https://job-listings-6de97.firebaseio.com/jobs.json")
        .then(res=>{
            const fetchedjobs = [];
            for ( let key in res.data ) {
                fetchedjobs.unshift( {
                    ...res.data[key],
                    id: key
                } );
            }
           
            dispatch(getjobSuccess(fetchedjobs,res.request.status))
        })
        .catch(err=>{
            dispatch(getjobFail(err.message))
        })
    }
}

export const postjobstart=()=>{
    return{
        type:actionTypes.POST_START
    }
}
export const postjobFail=(error)=>{
    return{
        type:actionTypes.POST_FAIL,
        error:error
    }
}
export const postjobSuccess=(status)=>{
    return{
        type:actionTypes.POST_SUCCESS,
        status:status,
    }
}

export const postjob=(dataPosting,token)=>{
    return dispatch=>{
        dispatch(postjobstart());
        axios.post("https://job-listings-6de97.firebaseio.com/jobs.json?auth="+token,dataPosting)
        .then(res=>{
            dispatch(postjobSuccess(res.request.status))
        })
        .catch(err=>{
            dispatch(postjobFail(err.message))
        })
    }
}