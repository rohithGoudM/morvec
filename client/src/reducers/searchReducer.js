let initialState = {
	query:'',
	error:{},
	movieResults:[],
	userResults:[],
    bookResults:[]
}

export const searchReducer = (state=initialState,action)=>{
   switch(action.type){
    	case 'SET_SEARCH':
        	return {...state, query: action.payload}
        case 'SET_MOVIE_RESULTS':
        	return {...state, movieResults: action.payload}
        case 'SET_USER_RESULTS':
        	return {...state, userResults: action.payload}
        case 'PUSH_ERROR_FROM_MOVIE':
        	return {...state, movieResults:[action.payload]}
        case 'RESET_USER_RESULTS':
            return {...state, userResults:[]}
        case 'RESET_MOVIE_RESULTS':
            return {...state, movieResults:[]}
        case 'RESET_QUERY':
        	return {...state, query:''}
    	default :
        	return state
   }
}