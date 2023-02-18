export const fetchMoviesFromGenreAction = (rating,imdbID)=>{
   return (dispatch)=>{
   	fetch('https://www.omdbapi.com/?i='+imdbID+'&apikey=5e67a871').then(res=>res.json())
    .then((movieDetails)=>{
      console.log(movieDetails)
      if(!movieDetails.Genre || movieDetails.Response=="False"){return null;}
      const movieType = movieDetails.Type == "movie" ? "movies" : "series";
      const data = {
        rating: rating.toString(),
        genre: movieDetails.Genre.trim().split(", ").sort().join(", "),
        title: movieDetails.Title,
        imdbID: movieDetails.imdbID,
        year: movieDetails.Year,
        poster: movieDetails.Poster,
        type: movieType
      }
      fetch('/rating/findOrCreate',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        }).then(res=>res.json())
        .then(result=>{
          if(result.list){
            const payload = {};
            payload.movie = result.movie;
            payload.rating = result.list;
            payload.index = Math.floor(payload.rating[movieType].length/2);
            payload.type = movieType;
            dispatch({type:'PLACE_MOVIE',payload:payload});
            dispatch({type:'RESET_MOVIE_RESULTS',payload:null});
          }else{
            dispatch({type:'RESET_MOVIE_RESULTS',payload:null});
          }
          });
    });
   }
}