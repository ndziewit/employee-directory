import React from 'react';
import './App.css';
import Header from "./components/Header"
import Search from "./components/Search"
import Employees from "./components/Employees"
import axios from "axios";
// import randomUsers from "./utils/randomUsers"

class App extends React.Component {
  state = {
    search: "",
    result: [],
    // Populate employees object so that it can be replaced and as a backup if the randomUsers API doesn't work
    employees: [
      {
        photo: "http://placekitten.com/200/200", firstName: "James", lastName: "Ravelle", phone: "610-442-1195", email: "james.ravelle@gmail.com", DOB: "5-23-1988"
      },
      {
        photo: "http://placekitten.com/200/200", firstName: "Gary", lastName: "Smith", phone: "610-555-5555", email: "gary@gmail.com", DOB: "3-6-1991"
      },
      {
        photo: "http://placekitten.com/200/200", firstName: "John", lastName: "Johnson", phone: "610-123-5555", email: "john@gmail.com", DOB: "4-4-1945"
      },
      {
        photo: "http://placekitten.com/200/200", firstName: "Luna", lastName: "Lovegood", phone: "610-866-5164", email: "luna@gmail.com", DOB: "12-3-1992"
      }
    ],
    sort: "Hello"
  }

  componentDidMount() {
    // Get data for 10 users
    axios
      .get("https://randomuser.me/api/?results=10")
      .then(response => {
        console.log(response.data.results);
        // Build new employees object with random users 
        let newArray = []
        for(let i = 0; i < response.data.results.length; i++){
          let newObject = {
            photo: response.data.results[i].picture.large,  
            firstName: response.data.results[i].name.first,
            lastName: response.data.results[i].name.last,
            phone: response.data.results[i].phone,
            email: response.data.results[i].email,
            DOB: response.data.results[i].dob.age
          }
          newArray.push(newObject);
        }
        this.setState({ employees: newArray });
      })
      .catch(err => {
        // GET failed, log the error
        console.log(err);
      });
    
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const {value, name} = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });

  };

  handleSearch = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    let resultArray = [];
    console.log(this.state.search);
    // If the search is empty, show all results
    if(this.state.search === ""){
      for(let i = 0; i < this.state.employees.length; i++){
          // this.state.result.push(this.state.employees[i])
          resultArray.push(this.state.employees[i]);
      }
      this.setState({
        result: resultArray
      });
    } else {
      for(let i = 0; i < this.state.employees.length; i++){
        let newString = this.state.employees[i].firstName + this.state.employees[i].lastName
        if(newString.includes(this.state.search)){
          // this.state.result.push(this.state.employees[i])
          if (resultArray.length <= 0){
            resultArray = [this.state.employees[i]];
          } else {
            resultArray.push(this.state.employees[i])
          }
          this.setState({
            result: resultArray
          });
        }
      }
    }
  };

  handleSort = event => {
    event.preventDefault();
    this.setState({ sort: event.target.value})
    const compareLastNames = ( a, b ) => {
      if ( a.lastName < b.lastName ){ return -1; }
      if ( a.lastName > b.lastName ){ return 1; }
      return 0;
    }
    const compareFirstNames = ( a, b ) => {
      if ( a.firstName < b.firstName ){ return -1; }
      if ( a.firstName > b.firstName ){ return 1; }
      return 0;
    }
    const comparePhone = ( a, b ) => {
      if ( a.phone < b.phone ){ return -1; }
      if ( a.phone > b.phone ){ return 1; }
      return 0;
    }
    const compareEmail = ( a, b ) => {
      if ( a.email < b.email ){ return -1; }
      if ( a.email > b.email ){ return 1; }
      return 0;
    }
    const compareAge = ( a, b ) => {
      if ( a.DOB < b.DOB ){ return -1; }
      if ( a.DOB > b.DOB ){ return 1; }
      return 0;
    }
    switch(event.target.value) {
      case "lastName":
        this.setState({ employees: this.state.employees.sort(compareLastNames)})
        break;
      case "firstName":
        this.setState({ employees: this.state.employees.sort(compareFirstNames)})
        break;
      case "phone":
        this.setState({ employees: this.state.employees.sort(comparePhone)})
        break;
      case "email":
        this.setState({ employees: this.state.employees.sort(compareEmail)})
        break;
      case "DOB":
        this.setState({ employees: this.state.employees.sort(compareAge)})
        break;
      default:
        break;
    }
  }

  resetSearch = event => {
    event.preventDefault();
    let resultArray = [];
    for(let i = 0; i < this.state.employees.length; i++){
      // this.state.result.push(this.state.employees[i])
      resultArray.push(this.state.employees[i]);
    }
    this.setState({
      search: "",
      result: [],
      employees: resultArray
    });
  }

  render() {
    const headline = "Employee Directory"
    return (
      <div className="App">
        <Header text={headline}/>
        <Search 
            value={this.state.search}
            onChange={this.handleInputChange}
            onClick={this.handleSearch}
            reset={this.resetSearch}
        />
        <div className="container">
        <Employees 
          employees = {this.state.result.length <= 0 ? this.state.employees : this.state.result}
          onClick={this.handleSort}
          sort={this.state.sort}
        />
        </div>
      </div>
    );
  }
}

export default App;
