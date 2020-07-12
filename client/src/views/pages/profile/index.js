import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchUserAction} from '../../../actions/myaction';
import {setProfileAction} from '../../../actions/profileActions';
// import SearchBar from '../../../components/searchBar';
import PlaceMovie from '../../../components/placeMovie';
// import RecommendationStrip from '../../../components/recommendationStrip';
// import InnerLoopForItems from './components/innerLoopForItems';
import ScrollRecs from './components/scrollRecs';

const Profile = (props)=>{

  useEffect(()=>{
    props.fetch_user();
    props.resetUserResults();
    props.resetMovieResults();
    props.resetQuery();
  },[]);

  switch(props.user){
    case null:
      return (
      	<div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        )
    case false:
      props.history.push('/login')
    default:

      !props.profile && props.setProfile(props.user._id);

      return (
      <div className="container-fluid">
        <div className="row py-3">
          <div className="col-md-3 p-3">
            {props.user && (
		          <React.Fragment>
            	<div className="row">
		            <div className="d-inline-flex px-3 pb-3">
		            <img 
		            src={props.user.picture} 
                alt="./NA.jpg"
		            style={{height:"46px", width:"auto"}} />
		            </div>
		            <div className="col">
		              <h5 className="my-auto">{props.user.name}</h5>
		            </div>
		          </div>
		          <div className="row px-3 pb-3" >
		          	<div><Link to="/"><button type="button" className="btn btn-dark">Home</button>
        				</Link></div>
                <div className="text-right mx-auto">
                {props.profile &&(<h6>Movies: {props.user.movies.length}</h6>)}
                {props.profile &&(<h6>Series: {props.user.series.length}</h6>)}
                </div>
		          </div>
		          </React.Fragment>
		         )}
          </div>
          <div className="col-md-9">
            <PlaceMovie />
            <h5>Movies</h5>
            {!props.profile /*&& !props.profile.movies*/ && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {props.profile && props.profile.movies && (<ScrollRecs items={props.profile.movies} type="movies" />)}
            <h5>Series</h5>
            {props.profile && !props.profile.series && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {props.profile && props.profile.series && (<ScrollRecs items={props.profile.series} type="series" />)}
          </div>
        </div>
      </div>
    )
  }
  
}


const mapDispathToProps = (dispatch)=>{
  return {
    resetQuery:()=>{dispatch({type:'RESET_QUERY',payload:null})},
    resetUserResults:()=>{dispatch({type:'RESET_USER_RESULTS',payload:null})},
    resetMovieResults:()=>{dispatch({type:'RESET_MOVIE_RESULTS',payload:null})},
    fetch_user:()=>{dispatch(fetchUserAction())},
    setProfile: (userID)=>{dispatch(setProfileAction(userID))},
    removeMovie: (movie)=>{dispatch({type:'REMOVE_MOVIE',payload:movie})},
    update_seenMovies:(imdbID)=>{dispatch({type:'PUSH_IMDBID_TO_SEENMOVIES',payload:imdbID})},
    setLoading:(value)=>{dispatch({type:'SET_LOADING_STATUS',payload:value})}
  }
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       profile: state.profile
   }
}

export default connect(mapStateToProps,mapDispathToProps)(Profile);