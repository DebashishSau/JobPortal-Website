import React from 'react'
import './Spinner.css'
const spinner=()=>{
    return(
        <React.Fragment>
             <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          
        
        </React.Fragment>
    )
}
export default spinner;