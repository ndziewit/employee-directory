import React, { Component } from "react";
import API from "../utils/API";
import Search from "./Search";
import Card from "./Card";

class Employees extends Component {
    state = {
        result: [],
        search: ""
    }
    componentDidMount() {
        API.getUsers()
            .then(res => this.setState({ 
                 result: res.data.results.map((res) => ({
                    picture: res.picture.medium,
                    firstName: res.name.first,
                    lastName: res.name.last,
                    dob: res.dob.age,
                    email: res.email,
                    phone: res.phone
            }))
        }))
        .catch(err => console.log(err));
    
    }

    searchEmployees = query => {
        console.log(query)
        API.getUsers(query)
            .then(res => this.setState({ 
                result: res.data.results.map(res => ({
                    picture: res.picture.medium,
                    firstName: res.name.first,
                    lastName: res.name.last,
                    dob: res.dob.age,
                    email: res.email,
                    phone: res.phone
                }))
            }))
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchEmployees(this.state.search)
    }
    




    render() {
        return (
            <div className="container">
                <h1>Employee Directory</h1>
                <Search 
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}

                />
                {this.state.result.map((res) => 
                <Card 
                    picture={res.picture}
                    firstName={res.firstName}
                    lastName={res.lastName}
                    dob={res.dob}
                    email={res.email}
                    phone={res.phone}
                />
                )}
                
            </div>
        )
    }
}

export default Employees;