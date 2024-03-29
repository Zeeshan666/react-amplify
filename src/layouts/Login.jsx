
import React, { useState ,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';

import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import Swal from 'sweetalert2'

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  console.log(props)
  const classes = useStyles();
 


const [username, setusername] = useState("");
const [password ,setpassword]=useState("");

/*
 const handleSubmit = e => {
  e.preventDefault();
  alert(setusername)
  
 };*/
 useEffect(() => {
  // Update the document title using the browser API
   let my = localStorage.getItem("accesToken");
   if(my != null){
    props.history.push('admin/dashboard');
   }
  
});
 
const onPressButton = (e) => {
  
  e.preventDefault();
     const data ={
       name : username,
       password :password,
     }
     console.log("ye "+ data.name)
    axios.post('/api/api.php?api=login', data)
    .then(response=>{
       
         let x= response.data;
         console.log(x);

         if(x.msg==="success"){
           
            localStorage.setItem("accesToken",x.id)
     return  window.location='/admin/dashboard'
         }
         else{
          Swal.fire(
            'Error!',
            'invalid username or password',
            'error'
          )
         }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign int {username}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="user name"
            name="name"
            type="text"
            autoComplete="user name"
            autoFocus
            onChange={e => setusername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setpassword(e.target.value)}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onPressButton}
          >
            Sign In
          </Button>
          
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}