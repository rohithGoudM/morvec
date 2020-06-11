let initailState = {
    ratingInstance: null,
    index: null,
    type: null,
    item: null
}

export const placeMovieInGenre = (state=null,action)=>{
	switch(action.type){
    	case 'PLACE_MOVIE':
        	return action.payload
        case 'SET_INDEX':
        	return {...state, index:action.payload}
        case 'SET_PLACE_MOVIE_NULL':
        	return null
    	default :
        	return state
   }
}