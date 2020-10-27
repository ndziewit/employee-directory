import React from "react";

function Search(props){
    return (
        <div className="search-bar">
        <p><strong>Search by name:</strong></p>
        <form className="form">
        <input
            value={props.value}
            name="search"
            onChange={props.onChange}
            type="text"
            placeholder="Search"
        />
         &nbsp;
         <button onClick={props.onClick}>Submit</button>
         &nbsp;
         <button onClick={props.reset}>Reset</button>
        </form>
        </div>
    );
}

export default Search;