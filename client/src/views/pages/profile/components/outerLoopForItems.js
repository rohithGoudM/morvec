import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import InnerLoopForHeadings from './innerLoopForHeadings';
import InnerLoopForItems from './innerLoopForItems';

const OuterLoopForItems = (props)=>{
	let itemRatings = props.items;
	let itemType = props.type;
	let itemHeadings = itemRatings.map((rating,ind)=>
		<InnerLoopForHeadings key={ind} rating={rating} type={itemType} />
	);
	let items = itemRatings.map((rating,ind)=>
		<InnerLoopForItems key={ind} rating={rating} type={itemType} />
	);
	return (
		<React.Fragment>
		<tr>{itemHeadings}</tr>
		<tr>{items}</tr>
		</React.Fragment>
		);
}

const mapStateToProps = (state)=>{
   return {
       user:state.auth,
       profile: state.profile
   }
}

export default connect(mapStateToProps)(OuterLoopForItems);