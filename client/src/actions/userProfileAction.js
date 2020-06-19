export const userProfileAction = (userID)=>{
 return (dispatch)=>{
    fetch('/user/getUserProfile',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          userID
        })
      }).then(res=>res.json())
      .then(result => {
        console.log(result);
        let movies = result.ratings.slice();
        let series = result.ratings.slice();
        movies.sort((a,b)=>{
          if(a.rating < b.rating){
            return 1;
          }else{
            if(a.rating==b.rating){
              if(a.movies.length<b.movies.length){
                return 1;
              }else{
                return -1
              }
            }else{
              return -1;
            }
          }
        });
        series.sort((a,b)=>{
          if(a.rating < b.rating){
            return 1;
          }else{
            if(a.rating==b.rating){
              if(a.series.length<b.series.length){
                return 1;
              }else{
                return -1
              }
            }else{
              return -1;
            }
          }
        });
        let tempMovies = [];
        let tempSeries = [];
        movies.map((rating)=>{
          rating.movies.map((movie)=>{
            !result.seenMovies.includes(movie.imdbID) && tempMovies.push(movie);
          })
        });
        series.map((rating)=>{
          rating.series.map((series)=>{
            !result.seenMovies.includes(series.imdbID) && tempSeries.push(series);
          })
        });
        // dispatch({type:'SET_SELECTED_USER',payload:{id:userID,name: selectedUserName, movies:tempMovies, series:tempSeries}});
        dispatch({type:'SET_USER_PROFILE',payload:{user:result.user, 
          moviesSort:movies, 
          seriesSort:series,
          movies:tempMovies,
          series:tempSeries
        }});
      });
 }
}