import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Plot from 'react-plotly.js';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const UsersList = (props) => {
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [second, setSecond] = useState([]);
  const [sub, setSub] = useState(0);
  const [sub1, setSub1] = useState(0);

  const [avgType, setAvgType] = useState("0");
  // const data;
  const handleChangeStartTime = (event) => {
    setStartDateTime(event.target.value);
    console.log(startDateTime);
  };

  const handleChangeEndTime = (event) => {
    setEndDateTime(event.target.value);
  };
  const handleSubmitStore = (event) => {
    event.preventDefault();
    setSub(1);
    console.log(sub);
    axios.get(` https://api.thingspeak.com/channels/1837487/feeds.json?api_key=D0K4706KANS7TEVC&start=${startDateTime}&end=${endDateTime}`)
      .then(response => {

        setSecond(response.data.feeds);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitStore1 = (event) => {
    event.preventDefault();
    setSub1(1);
    console.log(avgType);
    if (avgType == "10") {
      axios.get(` https://api.thingspeak.com/channels/1837487/feeds.json?api_key=D0K4706KANS7TEVC&start=${startDateTime}&end=${endDateTime}&average=10`)
        .then(response => {

          setSecond(response.data.feeds);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if (avgType == "20") {
      axios.get(` https://api.thingspeak.com/channels/1837487/feeds.json?api_key=D0K4706KANS7TEVC&start=${startDateTime}&end=${endDateTime}&average=20`)
        .then(response => {

          setSecond(response.data.feeds);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if (avgType == "daily") {
      axios.get(` https://api.thingspeak.com/channels/1837487/feeds.json?api_key=D0K4706KANS7TEVC&start=${startDateTime}&end=${endDateTime}&average="daily"`)
        .then(response => {

          setSecond(response.data.feeds);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      axios.get(` https://api.thingspeak.com/channels/1837487/feeds.json?api_key=D0K4706KANS7TEVC&start=${startDateTime}&end=${endDateTime}`)
        .then(response => {

          setSecond(response.data.feeds);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  };
  const onChangeAvgType = (event) => {
    setAvgType(event.target.value);
  }
  let CO2 = [];
  let times2 = [];
  let VOC = [];
  let times3 = [];
  let Humidity = [];
  let times4 = [];
  let Temperature = [];
  let times5 = [];
  let Moisture = [];
  let times7 = [];
  let Light = [];
  let times8 = [];
  for (let i = 0; i < second.length; i++) {

    if (second[i] != undefined) {
      if (second[i].field2 != null && second[i].field2 != "nan") {
        console.log(second[i].field2);
        CO2.push(second[i].field2);
        times2.push(second[i].created_at);
      }
      if (second[i].field3 != null && second[i].field3 != "nan") {
        console.log(second[i].field3);
        VOC.push(second[i].field3);
        times3.push(second[i].created_at);
      }
      if (second[i].field4 != null && second[i].field4 != "nan") {
        console.log(second[i].field4);
        Humidity.push(second[i].field4);
        times4.push(second[i].created_at);
      }
      if (second[i].field5 != null && second[i].field5 != "nan") {
        console.log(second[i].field5);
        Temperature.push(second[i].field5);
        times5.push(second[i].created_at);
      }
      if (second[i].field7 != null && second[i].field7 != "nan") {
        console.log(second[i].field7);
        Moisture.push(second[i].field7);
        times7.push(second[i].created_at);
      }
      if (second[i].field8 != null && second[i].field8 != "nan") {
        console.log(second[i].field8);
        Light.push(second[i].field8);
        times8.push(second[i].created_at);
      }
    }
  }
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>

      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>

                <Grid item xs={6}>

                  <TextField
                    id="datetime-local"
                    label="Start Date Time"
                    type="datetime-local"
                    variant="standard"
                    //defaultValue={startDateTime}
                    onChange={handleChangeStartTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      m: 1,
                      width: "25ch"
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="datetime-local"
                    label="End Date Time"
                    type="datetime-local"
                    variant="standard"
                    // defaultValue={endDateTime}
                    onChange={handleChangeEndTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      m: 1,
                      width: "25ch"
                    }}
                  />
                </Grid>
              </Grid>
            </ListItem>
            {/* <div><Button
              onClick={handleSubmitStore}
            >Submit</Button></div> */}
            <Divider />

          </List>
        </Grid>

      </Grid>
      <Grid item xs={12}>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Average Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={food_type}
            label="Average Type"
            onChange={onChangeAvgType}
          >
            <MenuItem value={10}>10 minutes</MenuItem>
            <MenuItem value={20}>20 minutes</MenuItem>
            <MenuItem value={60}>1 hour</MenuItem>
            <MenuItem value={"daily"}>Daily</MenuItem>



          </Select>
        </FormControl>
        <div><Button
          onClick={handleSubmitStore1}
        >Submit</Button></div>

      </Grid>
      {
        sub1 === 1 ?
          <Grid item xs={10} md={2}>


            <Plot
              data={[
                {
                  x: Object.values(times2),
                  y: Object.values(CO2),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'CO2(ppm)' }}
            />


            <Plot
              data={[
                {
                  x: Object.values(times3),
                  y: Object.values(VOC),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'VOC(ppb)' }}
            />

            <Plot
              data={[
                {
                  x: Object.values(times4),
                  y: Object.values(Humidity),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'Humidity(%)' }}
            />

            <Plot
              data={[
                {
                  x: Object.values(times5),
                  y: Object.values(Temperature),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'Temperature(C)' }}
            />

            <Plot
              data={[
                {
                  x: Object.values(times7),
                  y: Object.values(Moisture),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'Moisture' }}
            />

            <Plot
              data={[
                {
                  x: Object.values(times8),
                  y: Object.values(Light),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'Light Intensity' }}
            />

          </Grid>
          :
          null
      }
      {
        sub === 1 ?
          <Grid item xs={10} md={2}>


            <Plot
              data={[
                {
                  x: Object.values(times2),
                  y: Object.values(CO2),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'CO2(ppm)' }}
            />


            <Plot
              data={[
                {
                  x: Object.values(times3),
                  y: Object.values(VOC),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'VOC(ppb)' }}
            />

            <Plot
              data={[
                {
                  x: Object.values(times4),
                  y: Object.values(Humidity),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'Humidity(%)' }}
            />

            <Plot
              data={[
                {
                  x: Object.values(times5),
                  y: Object.values(Temperature),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'Temperature(C)' }}
            />

            <Plot
              data={[
                {
                  x: Object.values(times7),
                  y: Object.values(Moisture),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'Moisture' }}
            />

            <Plot
              data={[
                {
                  x: Object.values(times8),
                  y: Object.values(Light),
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: 700, height: 500, title: 'Light Intensity' }}
            />

          </Grid>
          :
          null
      }
      {/* <Plot
        data={[
          {
            x: Object.values(times2),
            y: Object.values(CO2),
            type: 'scatter',
            marker: { color: 'blue' },
          },
        ]}
        layout={{ width: 700, height: 500, title: 'CO2(ppm)' }}
      />
      <Plot
        data={[
          {
            x: Object.values(times3),
            y: Object.values(VOC),
            type: 'scatter',
            marker: { color: 'blue' },
          },
        ]}
        layout={{ width: 700, height: 500, title: 'VOC(ppb)' }}
      /> */}
    </div>
  );
};

export default UsersList;