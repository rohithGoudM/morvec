export const fetchMoviesFromGenreAction = (rating,imdbID)=>{
   return (dispatch)=>{
   	fetch('http://www.omdbapi.com/?i='+imdbID+'&apikey=9b1c32f2').then(res=>res.json())
    .then((movieDetails)=>{
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
      fetch('/movie/rating',{
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
            payload.moviesList = result.list;
            payload.index = Math.floor(payload.moviesList.length/2);
            payload.type = movieType;
            payload.genre = movieDetails.Genre;
            payload.rating = rating;
            dispatch({type:'PLACE_MOVIE',payload:payload});
            dispatch({type:'RESET_MOVIE_RESULTS',payload:null});
          }else{
            dispatch({type:'RESET_MOVIE_RESULTS',payload:null});
          }
          });
    });
   }
}