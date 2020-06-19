import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchMoviesFromGenreAction} from '../../../../actions/fetchMoviesFromGenreAction';

const TableData = (props)=>{

  const rateMovies = (givenRating, imdbID, type)=>{
    if(!props.user.seenMovies.includes(imdbID)){
      props.update_seenMovies(imdbID);
      props.fetchMoviesFromGenre(givenRating,imdbID);      
    }
  }

	let movie = props.movie;
	let itemType = props.type;
	if(props.user.seenMovies.includes(movie.imdbID)){
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
	            <button type="button" onClick={()=>rateMovies(1,movie.imdbID,itemType)} 
	            className="btn btn-dark dropdown-toggle-split px-2 py-0">1</button>
	            <button type="button" onClick={()=>rateMovies(2,movie.imdbID,itemType)} 
	            className="btn btn-dark dropdown-toggle-split px-2 py-0">2</button>
	            <button type="button" onClick={()=>rateMovies(3,movie.imdbID,itemType)} 
	            className="btn btn-dark dropdown-toggle-split px-2 py-0">3</button>
	            <button type="button" onClick={()=>rateMovies(4,movie.imdbID,itemType)} 
	            className="btn btn-dark dropdown-toggle-split px-2 py-0">4</button>
	            <button type="button" onClick={()=>rateMovies(5,movie.imdbID,itemType)} 
	            className="btn btn-dark dropdown-toggle-split px-2 py-0">5</button>
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
    update_seenMovies:(imdbID)=>{dispatch({type:'PUSH_IMDBID_TO_SEENMOVIES',payload:imdbID})},
    fetchMoviesFromGenre:(rating, imdbID)=>{dispatch(fetchMoviesFromGenreAction(rating,imdbID))}
  }
}

export default connect(mapStateToProps,mapDispathToProps)(TableData);