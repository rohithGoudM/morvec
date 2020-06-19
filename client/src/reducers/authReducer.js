export const authReducer = (state=null,action)=>{
   switch(action.type){
    	case 'GET_USER':
			return action.payload || false
    	case 'PUSH_IMDBID_TO_SEENMOVIES':
    		let temp = state.seenMovies;
    		temp.push(action.payload);
        	return {...state, seenMovies:temp}
    	default :
        	return state
   }
}