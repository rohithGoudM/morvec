import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchUserAction} from '../../../actions/myaction';
import SearchBar from '../../../components/searchBar';
import PlaceMovie from '../../../components/placeMovie';
import RecommendationStrip from '../../../components/recommendationStrip';
import AllUsers from '../../../components/allUsers';

const Home = (props)=>{

  useEffect(()=>{
    props.fetch_user();
    props.resetUserProfile();
    props.resetUserResults();
    props.resetMovieResults();
    props.resetQuery();
  },[])

    switch(props.user){
      case null:
        return (  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>)
      case false:
        props.history.push('/login')
      default:
          return (
          <div className="container-fluid">
            <div className="row py-3">
              <div className="col-md-3 ">
                <SearchBar />
              </div>
              <div className="col-md-9">
                <PlaceMovie />
                <AllUsers />
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
    resetUserProfile: ()=>{dispatch({type:'SET_USER_PROFILE_NULL',payload:null})}
  }
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth
   }
}

export default connect(mapStateToProps,mapDispathToProps)(Home);