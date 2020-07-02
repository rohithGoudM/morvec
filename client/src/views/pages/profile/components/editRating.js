import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchUserAction} from '../../../../actions/myaction';
import {userProfileAction} from '../../../../actions/userProfileAction';
import OuterLoopForItems from './outerLoopForItems';

const EditRating = (props)=>{

  let itemType = props.itemType;
  let movie = props.movie;
  let currentRating = props.ratingObj.rating;

  let editMovie = (givenRating, movie, itemType, ratingID)=>{
    console.log(givenRating)
  }


  let btnClass = (normalRating)=>{
    if(currentRating == normalRating){
      return "btn btn-dark dropdown-toggle-split px-2 py-0";
    }else{
      return "btn btn-outline-dark dropdown-toggle-split px-2 py-0";
    }
  }
  let btnOnClick = (normalRating, movie, itemType, ratingID)=>{
    if(currentRating != normalRating){
      return editMovie(normalRating, movie, itemType, ratingID);
    }
  }

  return (
    <p className="mx-n1 mb-0">
      <button type="button" onClick={()=>btnOnClick(1,movie,itemType)} 
      className={btnClass(1)}>1</button>
      <button type="button" onClick={()=>btnOnClick(2,movie,itemType)} 
      className={btnClass(2)}>2</button>
      <button type="button" onClick={()=>btnOnClick(3,movie,itemType)} 
      className={btnClass(3)}>3</button>
      <button type="button" onClick={()=>btnOnClick(4,movie,itemType)} 
      className={btnClass(4)}>4</button>
      <button type="button" onClick={()=>btnOnClick(5,movie,itemType)} 
      className={btnClass(5)}>5</button>
    </p>
  )
  
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       userProfile: state.userProfile
   }
}

export default connect(mapStateToProps)(EditRating);