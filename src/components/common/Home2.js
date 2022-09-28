import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
// import Grid from '@mui/system/Unstable_Grid';
// import styled from '@mui/system/styled';
import { styled } from '@mui/material/styles';
import { light } from "@mui/material/styles/createPalette";
import Paper from '@mui/material/Paper';
import Nav from "../templates/Nav";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   if (isLoggedIn) {    return <UserGreeting />;  }  return <GuestGreeting />;}
// const root = ReactDOM.createRoot(document.getElementById('root')); 
// // Try changing to isLoggedIn={true}:
// root.render(<Greeting isLoggedIn={false} />);

const HOME = (props) => {
  const [temp, setTemp] = useState("");
  const [ttime, setTtime] = useState("");
  const [tavg, setTavg] = useState("");
  const [hum, setHum] = useState("");
  const [htime, setHtime] = useState("");
  const [havg, setHavg] = useState("");
  const [mst, setMst] = useState("");
  const [mtime, setMtime] = useState("");
  const [mavg, setMavg] = useState("");
  const [co2, setCo2] = useState("");
  const [ctime, setCtime] = useState("");
  const [cavg, setCavg] = useState("");
  const [voc, setVoc] = useState("");
  const [vtime, setVtime] = useState("");
  const [vavg, setVavg] = useState("");
  const [light, setLight] = useState("");
  const [lavg, setLavg] = useState("");
  const [wnew, setWnew] = useState(0);
  // const [humid, setHumid] = useState("");
  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/tempdata';
    navigate(path);
  }

  useEffect(() => {
    const newData = {
      temp: temp,
      ttime: ttime,
      hum: hum,
      mst: mst,
      co2: co2,
      voc: voc,
      light: light,
      htime: htime,
      mtime: mtime,
      ctime: ctime,
      vtime: vtime,
    };
    const newAvg = {
      tavg: tavg,
      havg: havg,
      mavg: mavg,
      cavg: cavg,
      vavg: vavg,
      lavg: lavg,
    };
    axios
      .get("https://api.thingspeak.com/channels/1837496/feeds.json?api_key=ZPJ8PYOOKBVK4DQT&results=1", newData)
      .then((response) => {
        newData.temp = response.data.feeds[0].field3;
        newData.ttime = response.data.feeds[0].created_at;
        newData.hum = response.data.feeds[0].field4;
        newData.htime = response.data.feeds[0].created_at;
        newData.mst = response.data.feeds[0].field6;
        newData.mtime = response.data.feeds[0].created_at;
        newData.co2 = response.data.feeds[0].field1;
        newData.ctime = response.data.feeds[0].created_at;
        newData.voc = response.data.feeds[0].field2;
        newData.light = response.data.feeds[0].field5;
        newData.vtime = response.data.feeds[0].created_at;
        setTemp(newData.temp);
        setTtime(newData.ttime);
        setHum(newData.hum);
        setHtime(newData.htime);
        setMst(newData.mst);
        setMtime(newData.mtime);
        setCo2(newData.co2);
        setCtime(newData.ctime);
        setVoc(newData.voc);
        setVtime(newData.vtime);
        setLight(newData.light);
        // alert("Created\t" + response.data.feeds[0].created_at);
        console.log(response.data.feeds);
      });
    axios
      .get("https://api.thingspeak.com/channels/1837496/feeds.json?api_key=ZPJ8PYOOKBVK4DQT&minutes=1440&average=daily", newAvg)
      .then((response) => {
        newAvg.tavg = response.data.feeds[0].field3;
        newAvg.mavg = response.data.feeds[0].field6;
        newAvg.cavg = response.data.feeds[0].field1;
        newAvg.vavg = response.data.feeds[0].field2;
        newAvg.havg = response.data.feeds[0].field4;
        newAvg.lavg = response.data.feeds[0].field5;

        // newData.time = response.data.feeds[0].created_at;
        setTavg(newAvg.tavg);
        setMavg(newAvg.mavg);
        setCavg(newAvg.cavg);
        setVavg(newAvg.vavg);
        setHavg(newAvg.havg);
        setLavg(newAvg.lavg);


        if (parseFloat(newAvg.mavg) < 30) {
          setWnew(<Stack sx={{ width: '100%' }} spacing={2} alignItems="center">
            <Alert severity="warning">Your plant is underwatered!!</Alert>
            {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
          </Stack>);
        }
        else if ((newAvg.mavg) > 60) {
          setWnew(<Stack sx={{ width: '100%' }} spacing={2} alignItems="center">
          <Alert severity="warning">Your plant is overwatered!!</Alert>
          {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
        </Stack>);
        }
        else {
          setWnew(<Stack sx={{ width: '100%' }} spacing={2} alignItems="center">
            <Alert severity="success">Your plant has enough water</Alert>
            {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
          </Stack>);
        }

        // setTime(newData.time);
        // alert("Created\t" + response.data.feeds[0].created_at);
        console.log(response.data);
      });

  }, []);

  return (
    <div>
      <div><Nav /></div>
      <br></br>
      <br></br>
      <div>
        <Grid
          container
          spacing={0}
          paddingLeft='12vh'
          direction="row"
          alignItems="center"
          justify="center"
          style={{ minHeight: '70vh' }}
        >
          <Item>
            <Card sx={{ maxWidth: 500 }} sx={{ bgcolor: 'success.main' }}>
              <CardActionArea onClick={routeChange}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnR8ZW58MHx8MHx8&w=1000&q=80"
                  alt="green plant"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Temperature - {temp}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time - {ttime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Average Temperature - {tavg}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
          <Item>
            <Card sx={{ maxWidth: 500 }} sx={{ bgcolor: 'secondary.main' }}>
              <CardActionArea onClick={routeChange}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnR8ZW58MHx8MHx8&w=1000&q=80"
                  alt="green plant"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Humidity - {hum}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time - {htime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Average Humidity - {havg}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
          <Item>
            <Card sx={{ maxWidth: 500 }} sx={{ bgcolor: 'primary.main' }}>
              <CardActionArea onClick={routeChange}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnR8ZW58MHx8MHx8&w=1000&q=80"
                  alt="green plant"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Soil moisture - {mst}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time - {mtime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Average Moisture - {mavg}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
          <Item>
            <Card sx={{ maxWidth: 500 }} sx={{ bgcolor: 'warning.main' }}>
              <CardActionArea onClick={routeChange}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnR8ZW58MHx8MHx8&w=1000&q=80"
                  alt="green plant"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    CO2 - {co2}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time - {ctime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Average CO2 - {cavg}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
          <Item>
            <Card sx={{ maxWidth: 500 }} sx={{ bgcolor: 'info.main' }}>
              <CardActionArea onClick={routeChange}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnR8ZW58MHx8MHx8&w=1000&q=80"
                  alt="green plant"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    VOC - {voc}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time - {vtime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Average VOC - {vavg}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
          <Item>
            <Card sx={{ maxWidth: 500 }} sx={{ bgcolor: 'error.main' }}>
              <CardActionArea onClick={routeChange}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnR8ZW58MHx8MHx8&w=1000&q=80"
                  alt="green plant"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Light - {light}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time - {vtime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Average Light - {lavg}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
        </Grid>
      </div>
      {wnew}
    </div>

    // <div style={{ textAlign: "center" }}>
    //   <p>Temperature - {temp}
    //   </p>
    //   <p>
    //   Time - {time}
    //   </p>
    //   <p>
    //     Average - {avg}
    //   </p>
    //   </div>
  );
};

export default HOME;
