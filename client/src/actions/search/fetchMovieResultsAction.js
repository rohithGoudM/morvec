export const fetchMovieResultsAction = (query)=>{
   return (dispatch)=>{

   	fetch('http://www.omdbapi.com/?s='+query.trim().split(" ").join('+')+'&apikey=9b1c32f2')
    .then(res=>res.json())
    .then(results=>{
      if(results.Response == "True"){
      	dispatch({type:'SET_MOVIE_RESULTS',payload: results["Search"].filter((it)=>{
          return it.Type == "movie" || it.Type == "series";
        })});
      }else{
      	dispatch({type:'PUSH_ERROR_FROM_MOVIE',payload:{
          Poster:"./NA.jpg",
          Title:"Error",Year:results.Error
        }});
      }
    });
   }
}