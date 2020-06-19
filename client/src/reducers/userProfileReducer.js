export const userProfileReducer = (state=null,action)=>{
	switch(action.type){
    	case 'SET_USER_PROFILE':
        	return action.payload
    	case 'PUSH_IMDBID_TO_USER_PROFILE_SEENMOVIES':
        	return {...state, imdbID:action.payload}
    	case 'SET_USER_PROFILE_NULL':
        	return null
    	default :
        	return state
   }
}