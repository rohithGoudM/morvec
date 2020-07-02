export const profileReducer = (state=null,action)=>{
   switch(action.type){
    	case 'SET_PROFILE':
		    return action.payload
    	case 'RESET_ITEMTYPE':
		    return {...state, [action.payload]:null}
    	default :
        return state
   }
}