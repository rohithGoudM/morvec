import React from 'react';
import {connect} from 'react-redux';
import OuterLoopForItems from './outerLoopForItems';

const ScrollRecs = (props)=>{

  return (
    <div className="row mb-3">
      <div className=" table-responsive">                    
        <table className="table table-borderless mb-1">
          <tbody>
            {props.userProfile && (<OuterLoopForItems items={props.items} type={props.type} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
  
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       userProfile: state.userProfile
   }
}

export default connect(mapStateToProps)(ScrollRecs);