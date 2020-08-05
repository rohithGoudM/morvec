export const pushItemToNotRecommended = (itemID,itemType,imdbID)=>{
 return (dispatch)=>{
    fetch('/rating/pushItemToNotRecommended',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        itemID,
        itemType,
        imdbID
      })
    }).then(res=>res.json())
    .then(result => {
      if(result){
        itemType === "movies" || "series" 
          ? dispatch({type:'SET_NOTRECOMMENDED',payload:{itemType,itemIDs:result.currentUser[itemType+"NotRecommended"]}})
          : console.log(false);
        // dispatch({type:'PULL_ITEM', payload: {ratingID, itemID, itemType}});
      }
    });
 }
}