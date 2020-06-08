import React,{useEffect} from 'react';
import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter,Route} from 'react-router-dom';
import Login from './views/pages/login';
import Home from './views/pages/home';
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
     <Route path="/login" component={Login} />
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
