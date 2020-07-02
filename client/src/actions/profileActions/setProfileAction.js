export const setProfileAction = (userID)=>{
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
        dispatch({type:'SET_PROFILE',payload:{
          movies,
          series
        }});
      });
 }
}