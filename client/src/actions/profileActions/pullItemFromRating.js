export const pullItemFromRating = (ratingID,itemID,itemType,imdbID)=>{
 return (dispatch)=>{
    fetch('/rating/pullItem',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        ratingID,
        itemID,
        itemType,
        imdbID
      })
    }).then(res=>res.json())
    .then(result => {
      if(result){
        itemType === "movies" || "series" 
          ? dispatch({type:'SET_SEENITEMS',payload:{itemType,itemIDs:result.currentUser[itemType]}})
          : console.log(false);
        // dispatch({type:'PULL_ITEM', payload: {ratingID, itemID, itemType}});
      }
    });
 }
}