import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchMoviesFromGenreAction} from '../../../../actions/fetchMoviesFromGenreAction';
import TableData from './tableData';

const InnerLoopForItems = (props)=>{

  const rateMovies = (givenRating, imdbID, type)=>{
    if(!props.user.seenMovies.includes(imdbID)){
      props.update_seenMovies(imdbID);
      props.fetchMoviesFromGenre(givenRating,imdbID);      
    }
  }

	let rating = props.rating;
	let itemType = props.type;
  let opacity = "0.6";
  let recs = rating[itemType]
  .filter((mv)=>{
    return !props.user.seenMovies.includes(mv.imdbID);
  }).length;
	let itemsInRating = rating[itemType]
 //  .filter((mv)=>{
	// 	return !props.user.seenMovies.includes(mv.imdbID);
	// })
	.map((movie,ind)=>
		<TableData key={ind} ratingObj={rating} movie={movie} />
		);
  if(recs>0){
    return(
      <React.Fragment>
        {itemsInRating}
      </React.Fragment>
      )    
  }else{
    return null;
  }

}

const mapDispathToProps = (dispatch)=>{
  return {
    update_seenMovies:(imdbID)=>{dispatch({type:'PUSH_IMDBID_TO_SEENMOVIES',payload:imdbID})},
    fetchMoviesFromGenre:(rating, imdbID)=>{dispatch(fetchMoviesFromGenreAction(rating,imdbID))}
  }
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth
   }
}

export default connect(mapStateToProps,mapDispathToProps)(InnerLoopForItems);