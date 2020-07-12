import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Link,useParams} from 'react-router-dom';
import {fetchUserAction} from '../../../actions/myaction';
import {userProfileAction} from '../../../actions/userProfileAction';
import SearchBar from '../../../components/searchBar';
import PlaceMovie from '../../../components/placeMovie';
import RecommendationStrip from '../../../components/recommendationStrip';
import InnerLoopForItems from './components/innerLoopForItems';
import ScrollRecs from './components/scrollRecs';

const UserProfile = (props)=>{
  const {userID} = useParams()

  useEffect(()=>{
    props.setLoading(true);
    props.fetch_user();
    props.setUserProfile(userID);
    props.resetUserResults();
    props.resetMovieResults();
    props.resetQuery();
  },[])

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
        return (
        <div className="container-fluid">
          <div className="row py-3">
            <div className="col-md-3 p-3">
              {props.userProfile && (
  		          <React.Fragment>
              	<div className="row">
  		            <div className="d-inline-flex px-3 pb-3">
  		            <img 
  		            src={props.userProfile.user.picture} 
  		            style={{height:"46px", width:"auto"}} />
  		            </div>
  		            <div className="col">
  		              <h5 className="my-auto">{props.userProfile.user.name}</h5>
  		            </div>
  		          </div>
  		          <div className="row px-3 pb-3" >
  		          	<Link to="/">
          					<button type="button" className="btn btn-dark">Home</button>
          				</Link>
                  <div className="text-right mx-auto">
                    {props.userProfile &&(<h6>Total Movies: {props.userProfile.user.movies.length}</h6>)}
                    {props.userProfile &&(<h6>Total Series: {props.userProfile.user.series.length}</h6>)}
                  </div>
  		          </div>
  		          </React.Fragment>
  		         )}
            </div>
            <div className="col-md-9">
              <PlaceMovie />
              <h5>Movies</h5>
              {!props.userProfile && (
				      	<div className="spinner-border" role="status">
				          <span className="sr-only">Loading...</span>
				        </div>
				        )}
              {props.userProfile && (<ScrollRecs items={props.userProfile.moviesSort} type="movies" />)}
              <h5>Series</h5>
              {props.userProfile && (<ScrollRecs items={props.userProfile.seriesSort} type="series" />)}
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
    setUserProfile: (userID)=>{dispatch(userProfileAction(userID))},
    removeMovie: (movie)=>{dispatch({type:'REMOVE_MOVIE',payload:movie})},
    update_seenMovies:(imdbID)=>{dispatch({type:'PUSH_IMDBID_TO_SEENMOVIES',payload:imdbID})},
    setLoading:(value)=>{dispatch({type:'SET_LOADING_STATUS',payload:value})}
  }
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       userProfile: state.userProfile,
       loaing: state.loaing
   }
}

export default connect(mapStateToProps,mapDispathToProps)(UserProfile);