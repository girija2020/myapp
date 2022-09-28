import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Alld from './alld';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Data from '../users/Data';
import Menu from '@mui/material/Menu';
import Fourh from './fourh';
import Twelveh from './12h';
import Aday from './aday';
import Week from './week';
import Nav from "../templates/Nav";

    

//     render() {
  const D = () => {
    const [graph, setGraph] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleSelect = (id) => {
      if (id === 0) {
        setGraph(<Fourh></Fourh>);
      }
      if (id === 1) {
        setGraph(<Twelveh></Twelveh>);
      }
      if (id === 2) {
        setGraph(<Aday></Aday>);
      }
      if (id === 3) {
        setGraph(<Week></Week>);
      }
      handleClose();
    };
        // const { temperature, humidity, co2,voc,light, sm, ca } = this.state;
        return (
          <div>
            <div><Nav/></div>
            <br></br>
            <br></br>
            <div>
          <Button
            variant="contained"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleOpen}
          >
            Select Data
          </Button>
          
<Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={() => handleSelect(0)}>Last 4 Hour</MenuItem>
          <MenuItem onClick={() => handleSelect(1)}>Last 12 Hours</MenuItem>
          <MenuItem onClick={() => handleSelect(2)}>Last 24 Hours</MenuItem>
          <MenuItem onClick={() => handleSelect(3)}>Last 7 Days</MenuItem>
        </Menu>
        {graph}
        </div>

          </div>



        );
    };


// export { GetRequestAsyncAwait }; 
export default D;