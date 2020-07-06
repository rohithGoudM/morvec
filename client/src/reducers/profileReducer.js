export const profileReducer = (state=null,action)=>{
   switch(action.type){
      case 'SET_PROFILE':
        return action.payload
    	case 'PULL_ITEM':
        let temp = state[action.payload.itemType];
        temp.map((itemRating)=>{
          if(itemRating._id == action.payload.ratingID){
            console.log(itemRating._id == action.payload.ratingID);
            let tempItems = itemRating[action.payload.itemType].filter((item)=>{
              return item._id != action.payload.itemID;
            });
            itemRating[action.payload.itemType] = tempItems;
          }
        });
          // .filter((mv)=>{
          //  return !props.user.seenMovies.includes(mv.imdbID);
          // })
		    return {...state, [action.payload.itemType]:temp}
    	case 'RESET_ITEMTYPE':
		    return {...state, [action.payload]:null}
    	case 'SET_PROFILE_NULL':
        	return null
    	default :
        return state
   }
}