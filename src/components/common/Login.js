import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate ,Outlet} from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from "../templates/Navbar";
// 

//const [dum, setDum] = useState("0");

const Login = (props) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dumm, setDumm] = useState(0);
  const [dum, setDum] = useState(0);
  const [users, setUsers] = useState([]);
  var s = 0;
  var p = 0;

  

  const navigate = useNavigate();
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangepassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");

  };

  const onSubmit = (event) => {
    event.preventDefault();

    // const newUser = {
    //   email: email,
    //   password: password,

    // };
    if(email=="smartfarmingesw@gmail.com" && password=="@1438spR")
    {
        navigate("/Home2");
    }
    else
    {
        alert("Please fill Crt details");
    }
    
    // axios
    //   .post("/api/user/login/vendor", newUser)
    //   .then((res) => {
    //     //alert("Created\t" + response.data.name);
    //     //console.log(response.data);
    //     //setDum(3)
    //     // s = 1;
    //     if(res.data===3)
    //     {
    //       alert("provide all details");
    //     }
    //     else if (res.data === 2) {
    //       //navigate("/login/vendor");
    //       //setDum(4);
    //       //s=1;

    //       localStorage.setItem("email", email);
    //       alert("going into vendor page");
    //       //s=1;
    //       navigate("/login/vendor");
    //       //dad=2;
    //       setDumm(4);
    //     }
    //     else if(res.data===1)
    //     {
    //       localStorage.setItem("email", email);
    //       alert("going into buyer page");
    //       //s=1;
    //       navigate("/login/buyer");
    //       //dad=2;
    //     }
    //     else if(res.data===0)
    //     {
    //       alert("not registered");
    //     }
        






    //   });

  };

  //resetInputs();


  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      {/* <h1 >Welcom To Smart Farming</h1> */}

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <Grid container align={"center"} spacing={1}>
        <Grid item xs={12}>
            <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
            type="password"
            label="password"
            variant="outlined"
            value={password}
            onChange={onChangepassword}
            />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
            login
            </Button>
        </Grid>

        </Grid>
      </div>
    </div>
    
    
    
    
  );
};

export default Login;
