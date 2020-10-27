import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
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
};