import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchUserAction} from '../../actions/myaction';

const AllUsers = (props)=>{

  const [allUsers, setAllUsers] = useState([]);

  useEffect(()=>{
    fetch('/user/allUsers')
    .then(res=>res.json())
    .then(result=>{
      result.sort((a,b)=>{
        if(a.name > b.name){
          return 1;
        }else{
          return -1;
        }
      });
      setAllUsers(result);
    });
  },[]);

	return(
		<div>
		{allUsers.length > 0 && (
      <div className="row">
        <div className=" table-responsive">                    
          <table className="table table-borderless mb-1">
            <tbody>
              <tr>
              {allUsers.map((user,ind)=>{
                  return(
                  	<td key={ind} className="pl-1 pr-0 py-0" >
                      <Link to={user._id !== props.user._id?"/profile/"+user._id :"/"  }>
                    	<div className="card" style={{"width": "110px"}}>
                        <img src={user.picture} className="card-img-top" alt="..."/>
                        <div className="card-body p-1">
                          <h6 className="card-title m-0">{user.name}</h6>
                        </div>
                      </div>
                      </Link>
                    </td>
                  )
                })
              }                            
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )}
		</div>
	)
}

const mapDispathToProps = (dispatch)=>{
  return {
    setIndex:(index)=>{dispatch({type:'SET_INDEX',payload:index})},
    removePlacement:()=>{dispatch({type:'SET_PLACE_MOVIE_NULL',payload:null})},
    fetch_user:()=>{dispatch(fetchUserAction())},
    update_seenMovies:(imdbID)=>{dispatch({type:'PUSH_IMDBID_TO_SEENMOVIES',payload:imdbID})}
  }
}

const mapStateToProps = (state)=>{
   return {
      user: state.auth,
      placeItem:state.placement
   }
}

export default connect(mapStateToProps,mapDispathToProps)(AllUsers);