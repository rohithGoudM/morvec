export const profileReducer = (state=null,action)=>{
   switch(action.type){
    	case 'SET_PROFILE':
		    return action.payload
    	case 'RESET_ITEMTYPE':
		    return {...state, [action.payload]:null}
    	case 'SET_PROFILE_NULL':
        	return null
    	default :
        return state
   }
}