import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchMoviesAction} from '../../actions/fetchMoviesAction';
import {fetchUserAction} from '../../actions/myaction';

const SearchBar = (props)=>{

  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const NA = "./NA.jpg";

  const fetchSearchResults = (query)=>{
    setSearch(query);
    fetch('http://www.omdbapi.com/?s='+query.trim().split(" ").join('+')+'&apikey=9b1c32f2')
    .then(res=>res.json())
    .then(results=>{
      if(results.Response == "True"){
      setSearchResults(results["Search"].filter((it)=>{
        return it.Type == "movie" || it.Type == "series";
      }));
      }else{
        setSearchResults([{
          Poster:NA,
          Title:"Error",Year:results.Error
        }]);
      }
    });
  }

  const getMovies = (rating, imdbID)=>{
  if(!props.user.seenMovies.includes(imdbID)){
    setSearchResults([{
          Poster:NA,
          Title:"Loading",Year:"..."
        }]);
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
            props.placeMovieInGenre(payload);
          }
          props.fetch_user();
           setSearch('');
           setSearchResults([]);
          });
    });
  }else{        
    setSearchResults([{
          Poster:NA,
          Title:"Error",Year:"Seen Already"}]);
  }
}

  return(
    <React.Fragment>
      <div className="form-group">
        <input 
        type="text" 
        value={search.split("+").join(' ')}
        onChange={(e)=>{fetchSearchResults(e.target.value); setSearchResults([])}}
        className="form-control" placeholder="Search" aria-label="Username" 
        aria-describedby="basic-addon1"/>
      </div>
      {searchResults.map((item, ind)=>{
        return (
          <div className="row" key={ind} >
            <div className="d-inline-flex px-3 pb-3">
            <img 
            src={item.Poster=="N/A" ? NA : item.Poster} 
            style={{height:"96px", width:"auto"}} />
            </div>
            <div className="col">
            <h6>{item.Title}</h6>
            <p className="text-muted m-0">{item.Year}</p>
            {item.Type && (
              <p className="mx-auto">
                <button type="button" onClick={()=>getMovies(1,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">1</button>
                <button type="button" onClick={()=>getMovies(2,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">2</button>
                <button type="button" onClick={()=>getMovies(3,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">3</button>
                <button type="button" onClick={()=>getMovies(4,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">4</button>
                <button type="button" onClick={()=>getMovies(5,item.imdbID)} 
                className="btn btn-dark dropdown-toggle-split px-2 py-0">5</button>
                </p>)}            </div>
          </div>
          );
      })}
    </React.Fragment>
	)
}


const mapDispathToProps = (dispatch)=>{
  return {
    placeMovieInGenre:(cool)=>{dispatch(fetchMoviesAction(cool))},
    fetch_user:()=>{dispatch(fetchUserAction())}
  }
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth
   }
}

export default connect(mapStateToProps,mapDispathToProps)(SearchBar);