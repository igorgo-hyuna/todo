import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) => {
    return(
    	<div className="head">
    		<h1>Todo List</h1> <span>{toDo} more to do, {done} done</span>	
    	</div>				
    ); 
};

export default AppHeader;