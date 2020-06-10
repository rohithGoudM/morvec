import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchUserAction} from '../../actions/myaction';
import {fetchMovieResultsAction} from '../../actions/search';
import {fetchUserResultsAction} from '../../actions/search';
import {fetchMoviesFromGenreAction} from '../../actions/fetchMoviesFromGenreAction';
import {selectUserAction} from '../../actions/selectUserAction';

const SearchBar = (props)=>{

  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const [searchUsers,setSearchUsers] = useState([]);
  const NA = "./NA.jpg";

  const fetchSearchResults = (query)=>{
    props.setSearch(query);
    props.fetchMovieResults(query);
    props.fetchUserResults(query);
    props.setSelectedUserNull();
    props.setPlaceMovieNull();
  }

  const getUser = (userID, selectedUserName)=>{
    if(userID != props.user._id){
      props.fetch_user();
      props.setSelectedUser(userID,selectedUserName,props.user.seenMovies);
      props.resetUserResults();
      props.resetMovieResults();
      props.resetQuery();
    }
  }

  const getMovies = (rating, imdbID)=>{
    props.resetQuery();
    // props.fetch_user();
    if(!props.user.seenMovies.includes(imdbID)){
      props.setError({
            Poster:"./NA.jpg",
            Title:"Loading",Year:"..."
          });
      props.fetchMoviesFromGenre(rating,imdbID);
      props.update_seenMovies(imdbID);
    }else{
      props.setError({
            Poster:"./NA.jpg",
            Title:"Error",Year:"Seen Already"});
    }
  }

  return(
    <React.Fragment>
      <div className="form-group">
        <input 
        type="text" 
        value={props.search.query}
        onChange={(e)=>{fetchSearchResults(e.target.value); props.setError({
          Poster:"./NA.jpg",
          Title:"Loading",Year:"..."
        });}}
        className="form-control" placeholder="Search" aria-label="Username" 
        aria-describedby="basic-addon1"/>
      </div>
      {props.search.userResults.map((item, ind)=>{
        return (
          <a href="#" key={ind}><div className="row" onClick={()=>getUser(item._id,item.name)} >
            <div className="d-inline-flex px-3 pb-3">
            <img 
            src={item.picture} 
            style={{height:"46px", width:"auto"}} />
            </div>
            <div className="col">
              <h4 className="my-auto">{item.name}</h4>
            </div>
          </div>
          </a>
          );
      })}
      {props.search.movieResults.map((item, ind)=>{
        return (
          <div className="row" key={ind} >
            <div className="d-inline-flex px-3 pb-3">
            <img 
            src={item.Poster=="N/A" ? NA : item.Poster} 
            style={{height:"96px", width:"auto"}} />
            </div>
            <div className="col">
            <h6>{item.Title}</h6>
            <p className="text-muted m-0">{item.Year}</p>
            {item.Type && (
              <p className="mx-auto">
                <button type="button" onClick={()=>getMovies(1,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">1</button>
                <button type="button" onClick={()=>getMovies(2,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">2</button>
                <button type="button" onClick={()=>getMovies(3,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">3</button>
                <button type="button" onClick={()=>getMovies(4,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">4</button>
                <button type="button" onClick={()=>getMovies(5,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">5</button>
                </p>)}            </div>
          </div>
          );
      })}
    </React.Fragment>
	)
}


const mapDispathToProps = (dispatch)=>{
  return {
    setSearch:(query)=>{dispatch({type:'SET_SEARCH',payload:query})},
    resetQuery:()=>{dispatch({type:'RESET_QUERY',payload:null})},
    fetchMovieResults: (query)=>{dispatch(fetchMovieResultsAction(query))},
    fetchUserResults: (query)=>{dispatch(fetchUserResultsAction(query))},
    resetUserResults:()=>{dispatch({type:'RESET_USER_RESULTS',payload:null})},
    resetMovieResults:()=>{dispatch({type:'RESET_MOVIE_RESULTS',payload:null})},
    fetch_user:()=>{dispatch(fetchUserAction())},
    setSelectedUser: (userID,selectedUserName,seenMovies)=>{dispatch(selectUserAction(userID,selectedUserName,seenMovies))},
    setError: (err)=>{dispatch({type:'PUSH_ERROR_FROM_MOVIE',payload:err})},
    fetchMoviesFromGenre:(rating, imdbID)=>{dispatch(fetchMoviesFromGenreAction(rating,imdbID))},
    setSelectedUserNull:()=>{dispatch({type:'SET_SELECTED_USER_NULL',payload:null})},
    setPlaceMovieNull:()=>{dispatch({type:'SET_PLACE_MOVIE_NULL',payload:null})},
    update_seenMovies:(imdbID)=>{dispatch({type:'PUSH_IMDBID_TO_SEENMOVIES',payload:imdbID})}
  }
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       search:state.search
   }
}

export default connect(mapStateToProps,mapDispathToProps)(SearchBar);