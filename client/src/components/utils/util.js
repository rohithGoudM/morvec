const export RateCard = ()=>{
	return (
		<div class="card" style={{"width": "136px"}}>
          <img src="./nonStop.jpg" class="card-img-top" alt="..."/>
          <div class="card-body p-1">
            <h6 class="card-title m-0">Non-Stop</h6>
            <p class="card-text m-0">2015</p>
            <p className="mx-n1">
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
              </p>
          </div>
        </div>
    )
}