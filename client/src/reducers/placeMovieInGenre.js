export const placeMovieInGenre = (state=null,action)=>{
	switch(action.type){
    	case 'PLACE_MOVIE':
        	return action.payload
        case 'SET_INDEX':
        	return {...state, index:action.payload}
        case 'SET_NULL':
        	return null
    	default :
        	return state
   }
}