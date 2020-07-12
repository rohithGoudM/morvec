import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchMoviesFromGenreAction} from '../../../../actions/fetchMoviesFromGenreAction';
import TableData from './tableData';

const InnerLoopForItems = (props)=>{

	let rating = props.rating;
	let itemType = props.type;
  let recs = rating[itemType]
  .filter((mv)=>{
    return !props.user[itemType].includes(mv.imdbID);
  }).length;
	let itemsInRating = rating[itemType]
 //  .filter((mv)=>{
	// 	return !props.user[itemType].includes(mv.imdbID);
	// })
	.map((movie,ind)=>
		<TableData key={ind} ratingObj={rating} movie={movie} type={itemType} />
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

const mapStateToProps = (state)=>{
   return {
       user:state.auth
   }
}

export default connect(mapStateToProps)(InnerLoopForItems);