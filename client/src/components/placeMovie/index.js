import React from 'react';
import {connect} from 'react-redux';
import {fetchUserAction} from '../../actions/myaction';

const PlaceMovie = (props)=>{

	const move = (direction)=>{
		if(direction==="left" && props.placeItem.index>0){
			props.placeItem.rating[props.placeItem.type].splice(props.placeItem.index,1);
			props.setIndex(props.placeItem.index-1);
		}
		if(direction==="right" && props.placeItem.index<props.placeItem.rating[props.placeItem.type].length-1){
			props.placeItem.rating[props.placeItem.type].splice(props.placeItem.index,1);
			props.setIndex(props.placeItem.index+1);
		}
	}

	const done = ()=>{

    fetch('/rating/placeItem',{
      method:"post",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        type:props.placeItem.type,
        ratingID:props.placeItem.rating._id,
        index:props.placeItem.index,
        itemID:props.placeItem.movie._id,
        imdbID: props.placeItem.movie.imdbID
      })
    }).then(res=>res.json())
    .then(result=>{      
      props.removePlacement();
      props.update_seenMovies(props.placeItem.movie.imdbID);
    });
	}

	return(
		<div>
		{props.placeItem && (
      <div className="row">
        <div className=" table-responsive">                    
          <table className="table mb-1">
            <tbody>
              <tr>
              {!props.placeItem.rating[props.placeItem.type].includes(props.placeItem.movie) 
                && props.placeItem.rating[props.placeItem.type].splice(props.placeItem.index,0,props.placeItem.movie) }
              {props.placeItem.rating[props.placeItem.type].map((movie,ind)=>{
                  return(
                  	<td key={ind} className="pl-1 pr-0 py-0" >
                    	<div className="card" style={{"width": "110px"}}>
                        <img src={movie.poster} className="card-img-top" alt="..."/>
                        <div className="card-body p-1">
                          <h6 className="card-title m-0">{movie.title}</h6>
                          <p className="card-text m-0">{movie.year}</p>
                        </div>
                      </div>
                    </td>
                  )
                })
              }                            
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 text-center p-3" >
          <button type="button" className="btn btn-dark btn-lg" onClick={()=>{move("left")}} >Left</button>
          <button type="button" className="btn btn-outline-dark btn-lg" onClick={()=>{done()}}>Done</button>
          <button type="button" className="btn btn-dark btn-lg" onClick={()=>{move("right")}} >Right</button>
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
       placeItem:state.placement
   }
}

export default connect(mapStateToProps,mapDispathToProps)(PlaceMovie);