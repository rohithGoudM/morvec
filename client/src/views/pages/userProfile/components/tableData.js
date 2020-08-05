import React from 'react';
import {connect} from 'react-redux';
import {fetchMoviesFromGenreAction} from '../../../../actions/fetchMoviesFromGenreAction';
import {pullItemFromRating} from '../../../../actions/profileActions';
import {pushItemToNotRecommended} from '../../../../actions/profileActions';
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

  const rateMovies = (givenRating, imdbID)=>{
    if(!props.user[itemType].includes(imdbID)){
      props.update_seenItems(imdbID,itemType);
      props.fetchMoviesFromGenre(givenRating,imdbID);      
    }
  }

	let movie = props.movie;

  const notRecommended=()=>{
    props.pushItemToNotRecommended(movie._id, itemType, movie.imdbID);
  }

	if(props.user[itemType].includes(movie.imdbID) || props.user[itemType+"NotRecommended"].includes(movie.imdbID) ){
		return (
			<td key={movie.imdbID} className="pl-1 pr-0 py-0" style={{opacity: "0.6" }}  >
		    	<div className="card" style={{"width": "110px"}}>
			        <img src={movie.poster} className="card-img-top" alt="..."/>
			        <div className="card-body p-1">
			          <h6 className="card-title m-0">{movie.title}</h6>
			          <p className="card-text m-0">{movie.year}</p>
			        </div>
			    </div>
		    </td>
		)
	}else{
		return (
			<td key={movie.imdbID} className="pl-1 pr-0 py-0" >
		    	<div className="card" style={{"width": "110px"}}>
		        <img src={movie.poster} className="card-img-top" alt="..."/>
		        <div className="card-body p-1">
		          <h6 className="card-title m-0">{movie.title}</h6>
		          <p className="card-text m-0">{movie.year}</p>
		          <p className="mx-n1 mb-0">
		            <button type="button" onClick={()=>rateMovies(1,movie.imdbID)} 
		            className="btn btn-dark dropdown-toggle-split px-2 py-0">1</button>
		            <button type="button" onClick={()=>rateMovies(2,movie.imdbID)} 
		            className="btn btn-dark dropdown-toggle-split px-2 py-0">2</button>
		            <button type="button" onClick={()=>rateMovies(3,movie.imdbID)} 
		            className="btn btn-dark dropdown-toggle-split px-2 py-0">3</button>
		            <button type="button" onClick={()=>rateMovies(4,movie.imdbID)} 
		            className="btn btn-dark dropdown-toggle-split px-2 py-0">4</button>
		            <button type="button" onClick={()=>rateMovies(5,movie.imdbID)} 
		            className="btn btn-dark dropdown-toggle-split px-2 py-0">5</button>
		            <button type="button" onClick={()=>notRecommended()}
		            className="btn btn-danger dropdown-toggle-split px-1 py-0 float-right">&#128711;</button>
		          </p>
		        </div>
		      </div>
		    </td>
		)
	}
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       userProfile: state.userProfile
   }
}

const mapDispathToProps = (dispatch)=>{
  return {
    update_seenItems:(imdbID,itemType)=>{dispatch({type:'PUSH_IMDBID_TO_SEENITEMS',payload:{imdbID,itemType}})},
    fetchMoviesFromGenre:(rating, imdbID)=>{dispatch(fetchMoviesFromGenreAction(rating,imdbID))},
    pullMovieFromGenreAndSeenmovies:(rating, movieID, it, imdbID)=>{dispatch(pullItemFromRating(rating, movieID, it, imdbID))},
    pushItemToNotRecommended:(movieID, it, imdbID)=>{dispatch(pushItemToNotRecommended(movieID, it, imdbID))}
  }
}

export default connect(mapStateToProps,mapDispathToProps)(TableData);