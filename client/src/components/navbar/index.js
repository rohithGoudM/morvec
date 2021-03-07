import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const Navbar = (props)=>{
    return(
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" >Morvec</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-md-auto">

            {props.user===null && (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {props.user === false && (
              <React.Fragment>
              <li className="nav-item active"><a className="nav-link" href="/privacyPolicy">Privacy Policy</a></li>
              <li className="nav-item active"><a className="nav-link" href="/termsAndConditions">Terms And Conditions</a></li>
              <li className="nav-item active"><a className="nav-link" href="mailto:mrohithg@gmail.com">Contact Us</a></li>
              <li className="nav-item active"><a className="nav-link" href="/auth/google">Signup</a></li>
              </React.Fragment>
            )}
            {props.user && (
              <React.Fragment>
                <li className="nav-item "><Link className="nav-link" to="/profile">Profile</Link></li>
                <li className="nav-item "><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><a className="nav-link" href="/auth/logout">Logout</a></li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
      )
}

const mapStateToProps = (state)=>{
    return {
        user:state.auth
    }
}

export default connect(mapStateToProps)(Navbar);