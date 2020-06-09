import React,{useState} from 'react';
import {connect} from 'react-redux';
import {fetchMoviesFromGenreAction} from '../../actions/fetchMoviesFromGenreAction';
import {fetchUserAction} from '../../actions/myaction';
import {selectUserAction} from '../../actions/selectUserAction';

const RecommendationStrip = (props)=>{

  const getMovies = (rating, imdbID, type,index)=>{
    if(!props.user.seenMovies.includes(imdbID)){
      props.setError({
            Poster:"./NA.jpg",
            Title:"Loading",Year:"..."
          });
      props.fetchMoviesFromGenre(rating,imdbID);
      props.fetch_user();
      props.selectedUser[type].splice(index,1);
    }else{
      props.setError({
            Poster:"./NA.jpg",
            Title:"Error",Year:"Seen Already"});
    }
  }

	return(
		<div>
			{props.selectedUser && (
			<div>
	      <div className="row mb-3">
	      <h5>{props.user.name}'s Movies</h5>
	        <div className=" table-responsive">                    
	          <table className="table mb-1">
	            <tbody>
	              <tr>
	              {props.selectedUser.movies.map((movie, ind)=>{
	              	return(
	                  	<td key={movie.imdbID} className="pl-1 pr-0 py-0" >
	                    	<div className="card" style={{"width": "110px"}}>
	                        <img src={movie.poster} className="card-img-top" alt="..."/>
	                        <div className="card-body p-1">
	                          <h6 className="card-title m-0">{movie.title}</h6>
	                          <p className="card-text m-0">{movie.year}</p>
								            <p className="mx-n1 mb-0">
								              <button type="button" onClick={()=>getMovies(1,movie.imdbID,"movies",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">1</button>
								              <button type="button" onClick={()=>getMovies(2,movie.imdbID,"movies",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">2</button>
								              <button type="button" onClick={()=>getMovies(3,movie.imdbID,"movies",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">3</button>
								              <button type="button" onClick={()=>getMovies(4,movie.imdbID,"movies",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">4</button>
								              <button type="button" onClick={()=>getMovies(5,movie.imdbID,"movies",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">5</button>
								              </p>
	                        </div>
	                      </div>
	                    </td>
	                  )
	              })}                          
	              </tr>
	            </tbody>
	          </table>
	        </div>
	      </div>
	      <div className="row">
	      <h5>{props.user.name}'s Series</h5>
	        <div className=" table-responsive">                    
	          <table className="table mb-1">
	            <tbody>
	              <tr>
	              {props.selectedUser.series.map((series, ind)=>{
	              	return(
	                  	<td key={series.imdbID} className="pl-1 pr-0 py-0" >
	                    	<div className="card" style={{"width": "110px"}}>
	                        <img src={series.poster} className="card-img-top" alt="..."/>
	                        <div className="card-body p-1">
	                          <h6 className="card-title m-0">{series.title}</h6>
	                          <p className="card-text m-0">{series.year}</p>
								            <p className="mx-n1">
								              <button type="button" onClick={()=>getMovies(1,series.imdbID,"series",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">1</button>
								              <button type="button" onClick={()=>getMovies(2,series.imdbID,"series",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">2</button>
								              <button type="button" onClick={()=>getMovies(3,series.imdbID,"series",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">3</button>
								              <button type="button" onClick={()=>getMovies(4,series.imdbID,"series",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">4</button>
								              <button type="button" onClick={()=>getMovies(5,series.imdbID,"series",ind)} 
								              className="btn btn-dark dropdown-toggle-split px-2 py-0">5</button>
								              </p>
	                        </div>
	                      </div>
	                    </td>
	                  )
	              })}                          
	              </tr>
	            </tbody>
	          </table>
	        </div>
	      </div>
	     </div>
	    )}
		</div>
	)
}

const mapDispathToProps = (dispatch)=>{
  return {
    setIndex:(index)=>{dispatch({type:'SET_INDEX',payload:index})},
    removePlacement:()=>{dispatch({type:'SET_NULL',payload:null})},
    setError: (err)=>{dispatch({type:'PUSH_ERROR_FROM_MOVIE',payload:err})},
    fetch_user:()=>{dispatch(fetchUserAction())},
    setSelectedUser: (userID,seenMovies)=>{dispatch(selectUserAction(userID,seenMovies))},
    fetchMoviesFromGenre:(rating, imdbID)=>{dispatch(fetchMoviesFromGenreAction(rating,imdbID))}
  }
}

const mapStateToProps = (state)=>{
   return {
   		user:state.auth,
       selectedUser: state.selectedUser
   }
}

export default connect(mapStateToProps,mapDispathToProps)(RecommendationStrip);