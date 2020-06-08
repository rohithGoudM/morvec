export const selectedUserReducer = (state=null,action)=>{
	switch(action.type){
    	case 'SET_SELECTED_USER':
        	return action.payload
    	case 'SET_SELECTED_USER_NULL':
        	return null
    	default :
        	return state
   }
}