import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import SearchBar from '../../../components/searchBar';
import PlaceMovie from '../../../components/placeMovie';

const Home = (props)=>{

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
                </div>

              </div>
              
             
          </div>
      )
    }
    
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth
   }
}

export default connect(mapStateToProps)(Home);