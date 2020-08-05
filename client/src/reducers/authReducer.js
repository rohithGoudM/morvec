export const authReducer = (state=null,action)=>{
   switch(action.type){
      case 'GET_USER':
        return action.payload || false
      case 'SET_SEENITEMS':
        return {...state, [action.payload.itemType]:action.payload.itemIDs}
    	case 'SET_NOTRECOMMENDED':
		    return {...state, [action.payload.itemType+"NotRecommended"]:action.payload.itemIDs}
    	case 'PUSH_IMDBID_TO_SEENITEMS':
    		let temp = state[action.payload.itemType];
    		temp.push(action.payload.imdbID);
        	return {...state, [action.payload.itemType]:temp}
    	default :
        	return state
   }
}