import React from "react";

function Employees(props){
    // This function changes the table header text
    const changeHeaders = input => {
        if(input === "lastName"){
            return "Last Name"
        } 
        if(input === "firstName"){
            return "First Name"
        } 
        if(input === "DOB"){
            return "Age"
        } 
        return input.charAt(0).toUpperCase() + input.substring(1);
    }

    // This function toggles the arrow
    const arrowDisplay = x => {
        if(x === "photo"){
            return "";
        }
        if(x === props.sort){
            return "⮝";
        } else {
            return "⮟";
        }
    }

    // This function toggles the background color
    const bgColorToggle = x => {
        if(x === "photo"){
            return "blue-bg";
        }
        if(x === props.sort){
            return "red-bg"
        } else {
            return "blue-bg"
        }
    }

    // display data, sort in app.js
    return (
        <div>
            <p><strong>Click headers to sort:</strong></p>
            {/* Output the table headers as buttons */}
            <div>
            <div className="row tableHeader no-gutters">
                {
                Object.keys(props.employees[0]).map(function(keyName, keyIndex) {
                        return (
                            <div className="col-md-2">
                            <button key={keyIndex} value={keyName} onClick={props.onClick} className={bgColorToggle(keyName)}>
                                {
                                changeHeaders(keyName) + "  " + arrowDisplay(keyName)
                                }
                            </button> 
                            </div>
                        )
                    })
                }
            </div>
            </div>
            <div className="employeeContainer">
                {/* Output employees array from state */}
               {
               props.employees.map((employee, index) => 
               <div className="row employee-row no-gutters">
                            <div className="col-md-2" key={index}>
                                <img src={employee.photo} alt="" className="profilePicture"/>
                            </div>
                            <div className="col-md-2" key={index}>
                               <div> {employee.firstName} </div>
                            </div>
                            <div className="col-md-2" key={index}>
                                {employee.lastName}
                            </div>
                            <div className="col-md-2" key={index}>
                                {employee.phone}
                            </div>
                            <div className="col-md-2" key={index}>
                                {}
                                <a href={"mailto:" + employee.email}>{employee.email}</a>
                            </div>
                            <div className="col-md-2" key={index}>
                                {employee.DOB}
                            </div>
                </div>   
                )
               }
            </div>
        </div>
    );
}

export default Employees;