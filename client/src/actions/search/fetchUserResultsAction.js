export const fetchUserResultsAction = (query)=>{
   return (dispatch)=>{
    query.trim()!="" ?
      fetch('/user/search-users',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({query})
      }).then(res=>res.json())
      .then(users=>{
        dispatch({type: 'SET_USER_RESULTS', payload: users});
      })
      : dispatch({type: 'RESET_USER_RESULTS', payload: null});
   }
}