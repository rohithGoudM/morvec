export const authReducer = (state=null,action)=>{
   switch(action.type){
    	case 'GET_USER':
			return action.payload || false
    	case 'PUSH_IMDBID_TO_SEENMOVIES':
    		state.seenMovies.push(action.payload);
        	return state
    	default :
        	return state
   }
}