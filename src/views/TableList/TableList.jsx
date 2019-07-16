/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Swal from 'sweetalert2'
import Search from "@material-ui/icons/Search";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';

import axios from "axios"
import React, { Component } from 'react'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
class TableList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Name:"",
      email:"",
      phone:"",
      firstName:"",
      lastName:"",
      show:false,
      message:"",
      user:[],
    };
    
  
  }



  myChangeHandler = (event) => {
    this.setState({[event.target.name]:event.target.value});
      console.log(this.state);
  } 
  
  mySubmitHandler = (event) => {
    alert(event.target.type)
    event.preventDefault();
    this.setState({
      Name:"",
      email:"",
      phone:"",
      firstName:"",
      lastName:""

    })
  
  }


  componentDidMount(){

    axios.get(`/api/api.php?api=userGet`)
    .then(res => {
      const user = res.data;
      this.setState({ user });
    })
    let my = localStorage.getItem("accesToken");
    if(my == null){
     this.props.history.push('/login');
    }
  }

 onPressButton = (e) => {
  e.preventDefault();
     const data ={
       name : this.state.Name ,
       fname :this.state.firstName,
       lname : this.state.lastName,
       phone : this.state.phone,
       email : this.state.email,
     }
     console.log("ye "+ data.Name)
    axios.post('/api/api.php?api=signup', data)
    .then(response=>{
       
         let x= response.data;
         console.log(x);
      if(x==="datainserted"){
        Swal.fire(
          'SUCCESS!',
          'DATA INSERTED SUCCESSFULY!',
          'success'
        )
      }else if(x==="error"){
        Swal.fire(
          'Error',
          'error try again!',
          'error'
        )
      }
      else if(x==="emailexist"){
        Swal.fire(
          'Error',
          'Email error try again!',
          'error'
        )
      }
      else if(x==="usernameexist"){
        Swal.fire(
          'Error',
          ' try again!',
          'error'
        )
      }
    
    
else(
  alert("success")
)
this.setState({
  Name:"",
  email:"",
  phone:"",
  firstName:"",
  lastName:""

})

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const { classes } = this.props;
 
    return (
      <div>
      
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}> USER {this.state.Name}</h4>
                <p className={classes.cardCategoryWhite}>User Data</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  
                  <GridItem xs={12} sm={12} md={6}>
                   
                    <TextField
        label="name"
        name="Name"
        className={classes.textField}
        value={this.state.Name}
        onChange={this.myChangeHandler}
        fullWidth
        required
        margin="normal"
      />
            
        
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                   
                   <TextField
       name="email"
       label="email"
       className={classes.textField}
       value={this.state.email}
       onChange={this.myChangeHandler}
       fullWidth
       
       margin="normal"
     />
           
       
                 </GridItem>
                
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                   
                   <TextField
       name="firstName"
       label="first name"
       className={classes.textField}
       value={this.state.firstname}
       onChange={this.myChangeHandler}
       fullWidth
       margin="normal"
     />
           
       
                 </GridItem>
                
                 <GridItem xs={12} sm={12} md={6}>
                   
                    <TextField
        name="lastName"
        label="last name"
        className={classes.textField}
        value={this.state.firstname}
        onChange={this.myChangeHandler}
        fullWidth
        margin="normal"
      />
            
        
                  </GridItem>
                 
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} >
                
                   
                   <TextField
       name="phone"
       label="phone"
       className={classes.textField}
       value={this.state.phone}
       onChange={this.myChangeHandler}
       fullWidth
       type="number"
       margin="normal"
     />
           
       
                 </GridItem>
                
                </GridContainer>
              
              </CardBody>
              <CardFooter>
                <Button onClick={this. onPressButton} color="primary">ADD USER</Button>
              </CardFooter>
            </Card>
          </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>USER DETAILS</h4>
              <p className={classes.cardCategoryWhite}>
              </p>
           
            </CardHeader>
            <CardBody>
        <div className={classes.searchWrapper}>
            <CustomInput
              formControlProps={{
                className: classes.margin + " " + classes.search
              }}
              inputProps={{
                placeholder: "Search",
                inputProps: {
                  "aria-label": "Search"
                }
              }}
            />
            <Button color="white" aria-label="edit" justIcon round>
              <Search />
            </Button>
          </div>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "EMAIL", "PHONE", "FIRST NAME","LAST NAME"]}
                tableData=
                  { this.state.user.map(person => [person.name,person.email,person.phone,person.fname,person.lname])}
                
              />
            </CardBody>
          </Card>
        </GridItem>
       
        
      </GridContainer>
       
      </div>
    
    );
  }
}




export default withStyles(styles)(TableList);
