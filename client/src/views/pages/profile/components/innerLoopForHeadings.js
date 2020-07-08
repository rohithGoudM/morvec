import React from 'react';
import {connect} from 'react-redux';

function InnerLoopForHeadings(props){
	let rating = props.rating;
	let itemType = props.type;
	let itemSpan = rating[itemType]
	.filter((mv)=>{
		return props.user.seenMovies.includes(mv.imdbID);
	})
	.length;
	
	if(itemSpan===1){
		return(
			<td className="pl-1 pr-0 py-0">{rating.rating}&#9733; {rating.genre}</td>
		)
	}else if(itemSpan>1){
		return(<td colSpan={itemSpan.toString()} className="pl-1 pr-0 py-0"  >{rating.rating}&#9733; {rating.genre}</td>)
	}else{
		return null;
	}
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth
   }
}

export default connect(mapStateToProps)(InnerLoopForHeadings);