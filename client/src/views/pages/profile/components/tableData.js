import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchMoviesFromGenreAction} from '../../../../actions/fetchMoviesFromGenreAction';
import {pullItemFromRating} from '../../../../actions/profileActions';
// import EditRating from './editRating';
// import EditRating from '../../../../components/editRating';

// EDIT RATING FROM COMPONENTS
// ALSO THINK OF A WAY TO GET THE ITEM STRIP AS A WHOLE FROM COMPONENTS
// components
//  ItemTable
//   TableData
//    EditRating

const TableData = (props)=>{

  let itemType = props.type;
  let movie = props.movie;
  let currentRating = props.ratingObj.rating;

  let editMovie = (givenRating)=>{
    props.pullMovieFromGenre(props.ratingObj._id,movie._id);
    // PUSH
    // props.resetItemType(itemType);
  }


  let btnClass = (normalRating)=>{
    if(currentRating == normalRating){
      return "btn btn-dark dropdown-toggle-split px-2 py-0";
    }else{
      return "btn btn-outline-dark dropdown-toggle-split px-2 py-0";
    }
  }
  let btnOnClick = (normalRating)=>{
    if(currentRating != normalRating){
      return editMovie(normalRating);
    }
  }

	return (
		<td key={movie.imdbID} className="pl-1 pr-0 py-0" >
    	<div className="card" style={{"width": "110px"}}>
        <img src={movie.poster} className="card-img-top" alt="..."/>
        <div className="card-body p-1">
          <h6 className="card-title m-0">{movie.title}</h6>
          <p className="card-text m-0">{movie.year}</p>
        </div>
      </div>
    </td>
	)
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       profile: state.profile
   }
}

const mapDispathToProps = (dispatch)=>{
  return {
    pullMovieFromGenre:(rating, imdbID)=>{dispatch(pullItemFromRating(rating,imdbID))},
    resetItemType:(itemType)=>{dispatch({type:'RESET_ITEMTYPE',payload:itemType})}
  }
}

export default connect(mapStateToProps,mapDispathToProps)(TableData);