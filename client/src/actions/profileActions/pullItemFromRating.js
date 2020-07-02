export const pullItemFromRating = (ratingID,item,itemType)=>{
 return (dispatch)=>{
    fetch('/rating/pullItem',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        ratingID,
        item,
        itemType
      })
    }).then(res=>res.json())
    .then(result => {
      // 
    });
 }
}