import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
// import Navbar from "./components/templates/Navbar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//import ".../src/App.css"

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Dass TAs");
  }, []);

  

  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      {/* <div style={{ 
      backgroundImage: `url("./components/plant.jpeg")` 
      }}></div> */}
      {/* style={{color: "red"}} */}
      <h1 style={{textAlign: "center"}}>Welcome To Smart Farming</h1>
      {/* image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnR8ZW58MHx8MHx8&w=1000&q=80" */}
      {/* <Card sx={{ maxWidth: 5 }} sx={{ bgcolor: 'success.main' }}>
      <CardActionArea >
      <CardMedia
        component="img"
        height="700"
        // image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnR8ZW58MHx8MHx8&w=1000&q=80"
        alt="green plant"
      />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Temperature - {temp}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Time - {ttime}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Average Temperature - {tavg}
          </Typography>
        </CardContent> */}
      {/* </CardActionArea>
    </Card> */} 
    </div>

  );
};

export default Home;
