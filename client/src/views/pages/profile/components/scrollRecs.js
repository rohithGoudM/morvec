import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchUserAction} from '../../../../actions/myaction';
import {userProfileAction} from '../../../../actions/userProfileAction';
import OuterLoopForItems from './outerLoopForItems';

const ScrollRecs = (props)=>{

  return (
    <div className="row mb-3">
      <div className=" table-responsive">                    
        <table className="table table-borderless mb-1">
          <tbody>
            {props.profile && (<OuterLoopForItems items={props.items} type={props.type} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
  
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       profile: state.profile
   }
}

export default connect(mapStateToProps)(ScrollRecs);