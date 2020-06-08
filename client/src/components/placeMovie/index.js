import React,{useState} from 'react';
import {connect} from 'react-redux';
import {fetchUserAction} from '../../actions/myaction';

const PlaceMovie = (props)=>{

	const move = (direction)=>{
		if(direction=="left" && props.placeItem.index>0){
			props.placeItem.moviesList.splice(props.placeItem.index,1);
			props.setIndex(props.placeItem.index-1);
		}
		if(direction=="right" && props.placeItem.index<props.placeItem.moviesList.length-1){
			props.placeItem.moviesList.splice(props.placeItem.index,1);
			props.setIndex(props.placeItem.index+1);
		}
	}

	const done = ()=>{
		const data = {
			movieID: props.placeItem.movie._id,
			genre: props.placeItem.genre,
			type: props.placeItem.type,
			rating: props.placeItem.rating,
			index: props.placeItem.index,
			imdbID: props.placeItem.movie.imdbID
		}
		
		fetch('/movie/placeMovie',{
			method: "post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(data)
		}).then(res=>res.json())
		.then(result=>{
			result && props.removePlacement();
			props.fetch_user();
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
              {!props.placeItem.moviesList.includes(props.placeItem.movie) && props.placeItem.moviesList.splice(props.placeItem.index,0,props.placeItem.movie) }
              {props.placeItem.moviesList.map((movie,ind)=>{
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
    fetch_user:()=>{dispatch(fetchUserAction())}
  }
}

const mapStateToProps = (state)=>{
   return {
       placeItem:state.placement
   }
}

export default connect(mapStateToProps,mapDispathToProps)(PlaceMovie);