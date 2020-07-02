import React,{useEffect} from 'react';
import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter,Route} from 'react-router-dom';
import Login from './views/pages/login';
import Home from './views/pages/home';
import UserProfile from './views/pages/userProfile';
import Profile from './views/pages/profile';
import PrivacyPolicy from './views/otherPages/privacyPolicy';
import TermsAndConditions from './views/otherPages/termsAndConditions';
import {connect} from 'react-redux';
import {fetchUserAction} from './actions/myaction';

function App(props) {
  useEffect(()=>{
     props.fetch_user();
     props.fetch_search();
  },[])
  return (
   <BrowserRouter>
     <Navbar />
     <Route exact path="/" component={Home} />
     <Route exact path="/profile" component={Profile} />
     <Route path="/profile/:userID" component={UserProfile} />
     <Route path="/login" component={Login} />
     <Route path="/privacyPolicy" component={PrivacyPolicy} />
     <Route path="/termsAndConditions" component={TermsAndConditions} />
   </BrowserRouter>
  );
}

const mapDispathToProps = (dispatch)=>{
  return {
    fetch_user:()=>{dispatch(fetchUserAction())},
    fetch_search:()=>{dispatch({type:'default',payload:null})}
  }
}

export default connect(null,mapDispathToProps)(App);
