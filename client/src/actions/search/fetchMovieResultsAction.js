export const fetchMovieResultsAction = (query)=>{
   return (dispatch)=>{
    if(query.trim().length <= 3){
      fetch('https://www.omdbapi.com/?t='+query.trim().split(" ").join('+')+'&apikey=5e67a871')
      .then(ress=>ress.json())
      .then(result=>{
        if(result.Response == "True" && (result.Type == "movie" || result.Type == "series")){
          dispatch({type:'SET_MOVIE_RESULTS',payload:[result]});
        }else{
          dispatch({type:'PUSH_ERROR_FROM_MOVIE',payload:{
            Poster:"./NA.jpg",
            Title:"Error",Year:result.Error
          }});
        }
      })
    }else{
     	fetch('https://www.omdbapi.com/?s='+query.trim().split(" ").join('+')+'&apikey=5e67a871')
      .then(res=>res.json())
      .then(results=>{
        if(results.Response == "True"){
        	dispatch({type:'SET_MOVIE_RESULTS',payload: results["Search"].filter((it)=>{
            return it.Type == "movie" || it.Type == "series";
          })});
        }else{
          if(results.Error == "Too many results."){
            fetch('https://www.omdbapi.com/?t='+query.trim().split(" ").join('+')+'&apikey=5e67a871')
            .then(ress=>ress.json())
            .then(result=>{
              if(result.Response == "True" && (result.Type == "movie" || result.Type == "series")){
                dispatch({type:'SET_MOVIE_RESULTS',payload:[result]});
              }else{
                dispatch({type:'PUSH_ERROR_FROM_MOVIE',payload:{
                  Poster:"./NA.jpg",
                  Title:"Error",Year:result.Error
                }});
              }
            });
          }else{
            dispatch({type:'PUSH_ERROR_FROM_MOVIE',payload:{
              Poster:"./NA.jpg",
              Title:"Error",Year:results.Error
            }});
          }      	
        }
      });
    }
   }
}