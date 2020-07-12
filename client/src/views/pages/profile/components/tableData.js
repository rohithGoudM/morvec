import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchMoviesFromGenreAction} from '../../../../actions/fetchMoviesFromGenreAction';
import {pullItemFromRating} from '../../../../actions/profileActions';
// import EditRating from './editRating';
// import EditRating from '../../../../components/editRating';

// EDIT RATING FROM COMPONENTS
// ALSO THINK OF A WAY TO GET THE ITEM STRIP AS A WHOLE FROM COMPONENTS
// components
//  ItemTable
//   TableData
//    EditRating
// ONLY DELETE OPTION

const TableData = (props)=>{

  let itemType = props.type;
  let movie = props.movie;
  let currentRating = props.ratingObj.rating;

  const deleteItemRating = ()=>{
    props.pullMovieFromGenreAndSeenmovies(props.ratingObj._id, movie._id, itemType, movie.imdbID);
    //pull out the item rating.
    //pull out imdbID from seenMovies.
  }

  // if(props.user[itemType].includes(movie.imdbID)){
    return (
      <td key={movie.imdbID} className="pl-1 pr-0 py-0" >
        <div className="card" style={{"width": "110px"}}>
          <img src={movie.poster} className="card-img-top" alt="..."/>
          <div className="card-body p-1">
            <h6 className="card-title m-0">{movie.title}</h6>
            <div>
              <p className="card-text m-0 float-left">{movie.year}</p>
              <button type="button" onClick={()=>deleteItemRating()} 
              className="btn btn-danger dropdown-toggle-split px-2 py-0 float-right">
                <i className='far fa-trash-alt'></i>
              </button>
            </div>
            
          </div>
        </div>
      </td>
    )
  // }else{
  //   return null;
  // }
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       profile: state.profile
   }
}

const mapDispathToProps = (dispatch)=>{
  return {
    pullMovieFromGenreAndSeenmovies:(rating, movieID, it, imdbID)=>{dispatch(pullItemFromRating(rating, movieID, it, imdbID))},
    resetItemType:(itemType)=>{dispatch({type:'RESET_ITEMTYPE',payload:itemType})}
  }
}

export default connect(mapStateToProps,mapDispathToProps)(TableData);

// <p className="mx-n1 mb-0">
//   <button type="button" onClick={()=>btnOnClick(1)} 
//   className={btnClass(1)}>1</button>
//   <button type="button" onClick={()=>btnOnClick(2)} 
//   className={btnClass(2)}>2</button>
//   <button type="button" onClick={()=>btnOnClick(3)} 
//   className={btnClass(3)}>3</button>
//   <button type="button" onClick={()=>btnOnClick(4)} 
//   className={btnClass(4)}>4</button>
//   <button type="button" onClick={()=>btnOnClick(5)} 
//   className={btnClass(5)}>5</button>
// </p>