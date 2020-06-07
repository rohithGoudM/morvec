export const fetchMoviesAction = (cool)=>{
   return (dispatch)=>{
    dispatch({type:'PLACE_MOVIE',payload:cool});
   }
}