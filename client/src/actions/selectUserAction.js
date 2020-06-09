export const selectUserAction = (userID,selectedUserName,seenMovies)=>{
 return (dispatch)=>{
    fetch('/user/getUser',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          userID
        })
      }).then(res=>res.json())
      .then(ratings => {
        let movies = ratings.slice();
        let series = ratings.slice();
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
            !seenMovies.includes(movie.imdbID) && tempMovies.push(movie);
          })
        });
        series.map((rating)=>{
          rating.series.map((series)=>{
            !seenMovies.includes(series.imdbID) && tempSeries.push(series);
          })
        });
        dispatch({type:'SET_SELECTED_USER',payload:{id:userID,name: selectedUserName, movies:tempMovies, series:tempSeries}});
      });
 }
}