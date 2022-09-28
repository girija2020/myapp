// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// import Grid from '@mui/material/Grid';

// const data=[]
// const date=[]
// const Tempdata = (props) => {
//   const [temp, setTemp] = useState("");
//   const [temper, setTemper] = useState("");
//   const [timer, setTimer] = useState("");
//   const [time, setTime] = useState("");
//   const [avg, setAvg] = useState("");
//   // const [humid, setHumid] = useState("");
//   useEffect(() => {
//     const newData = {
//       temp: temp,
//       time: time,
//     };
//     const newAvg = {
//       avg: avg,
//     };
//     axios
//       .get("https://api.thingspeak.com/channels/1837496/fields/3.json?average=daily", newData)
//       .then((response) => {
//         // newData.temp = response.data.feeds[3].field3;
      
        
//         for ( let i = 0; i < 100; i++)
//         {
//           // newData.temp = response.data.feeds[i].field3;
//           // newData.time = response. new Date(data.feeds[i].created_at).toLocaleString();
//           if (response.data.feeds[i]){
//           date.push(new Date(response. new Date(data.feeds[i].created_at).toLocaleString()).toLocaleDateString())
//           data.push(( response.data.feeds[i].field3 , new Date(response. new Date(data.feeds[i].created_at).toLocaleString()).toLocaleDateString()))
//           // setTemper([...temper, response.data.feeds[i].field3])}
//           // setTimer([...timer, response. new Date(data.feeds[i].created_at).toLocaleString()])
//         }
//         console.log(data)
//         setTemper(data)
//         setTimer(date)
//         // setTemp(newData.temp);
//         // setTime(newData.time);
//         // alert("Created\t" + response.data.feeds[0].created_at);
//         // console.log(response.data.feeds[0].field3);
//       }});
//     // axios28.78113207547170326.48802395209579823.99102564102566
//     //   .get("https://api.thingspeak.com/channels/1837496/feeds.json?api_key=ZPJ8PYOOKBVK4DQT&average", newAvg)
//     //   .then((response) => {
//     //     newAvg.avg = response.data.feeds[0].field3;
//     //     // newData.time = response.data.feeds[0].created_at;
//     //     setAvg(newAvg.avg);
//     //     // setTime(newData.time);
//     //     // alert("Created\t" + response.data.feeds[0].created_at);
//     //     // console.log(response.data.feeds[0].field3);
//     //   });
//   }, []);

//   return (
// //     <Grid
// //   container
// //   spacing={0}
// //   direction="column"
// //   alignItems="center"
// //   justify="center"
// //   style={{ minHeight: '200vh'}}
// //  >
    
// //     </Grid>
//     <div style={{ textAlign: "center" }}>
//       <p>Temperature - {temper} 
//       </p>
//       <p>
//       Time - {timer}
//       </p>
//       <p>
//         Average - {avg}
//       </p>
//       </div>
//   );
// };

// export default Tempdata;

import React from "react";
import axios from "axios";
import {flushSync} from 'react-dom'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { Button } from "@mui/material";
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import SelectInput from "@mui/material/Select/SelectInput";
import Moment from 'react-moment';
import moment from "moment";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Nav from "../templates/Nav";


window.moment = moment
const columns = [
  { name: 'Date', header: 'Date', minWidth: 50, defaultFlex: 1, filterEditor: DateFilter, dateFormat: 'MM/DD/YYYY',
  filterEditorProps: (props, { index }) => {
    // for range and notinrange operators, the index is 1 for the after field
    return {
      dateFormat: 'MM/DD/YYYY',
      cancelButton: false,
      highlightWeekends: false,
      placeholder: index == 1 ? 'Created date is before...': 'Created date is after...'
    }
  },
   render: ({ value, cellProps:{dateFormat} }) => 
     moment(value).format(dateFormat),

},
  { name: 'Time', header: 'Time', minWidth: 50, defaultFlex: 1},
  { name: 'Temperature', header: 'Temperature(C)', maxWidth: 1000, defaultFlex: 1, type:'number' },
  { name: 'Humidity', header: 'Humidity(%)', maxWidth: 1000, defaultFlex: 1 , type:'number'},
  { name: 'Light', header: 'Light(lx)', maxWidth: 1000, defaultFlex: 1 , type:'number'},
  { name: 'VOC', header: 'VOC(ppb)', maxWidth: 1000, defaultFlex: 1 , type:'number'},
  { name: 'CO2', header: 'CO2(ppm)', maxWidth: 1000, defaultFlex: 1 , type:'number'},
  { name: 'SM', header: 'Soil Moisture(%)', maxWidth: 1000, defaultFlex: 1 , type:'number'}
]

const gridStyle = { minHeight: 550 }
const dataSource = [
]
const avg=3600;


const filterValue = [
  { name: 'Date', operator: 'after', type: 'date', value: '', filterEditor: DateFilter},
  { name: 'Temperature', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter},
  { name: 'Humidity', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter },
  { name: 'Light', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter },
  { name: 'VOC', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter },
  { name: 'CO2', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter },
  { name: 'SM', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter }
];

const onChangeAvgType = (event) => {
  avg=event.target.value;
}



class TempData extends React.Component {
  
  
  constructor(props) {
      super(props);

      this.state = {
          temperature: [],
          humidity: [],
          light: [],
          voc: [],
          co2: [],
          sm: [],
          ca: [],
      };


      // const [sub1, setSub1] = useState(0);
      // const [avgType, setAvgType] = useState(0);
          
           
     
      // const handleSubmitStore1 = (event) => {
      //   event.preventDefault();
      //   setSub1(1);
      //   console.log(avgType);
      //   setAvgType(event.target)
      //   }

      
  }

 

  async componentDidMount() {
      
      
       const response= await fetch('https://api.thingspeak.com/channels/1837496/feeds.json?api_key=ZPJ8PYOOKBVK4DQT&average=10&start=2022-08-20');
      const data = await response.json();
      console.log(data.feeds[0].created_at);
      // var test = JSON.parse(response.data.feeds);
      console.log(data.feeds.length)
      for (let i = 0; i < data.feeds.length; i++){
      // dataSource.push({id: i, Date: new Date(i.created_at).toLocaleDateString(),Time: new Date(i.created_at).toLocaleTimeString(), Temperature: parseFloat(i.field3), Humidity: parseFloat(i.field4), CO2: parseFloat(i.field1), VOC: parseFloat(i.field2), Light: parseFloat(i.field5), SM: parseFloat(i.field6)})
        // data.forEach(item => newData.push({[item.country]: item.states})); 
      dataSource.push({id: i, Date: new Date( data.feeds[i].created_at).toLocaleDateString(),Time: new Date( data.feeds[i].created_at).toLocaleTimeString(), Temperature: parseFloat(data.feeds[i].field3), Humidity: parseFloat(data.feeds[i].field4), CO2: parseFloat(data.feeds[i].field1), VOC: parseFloat(data.feeds[i].field2), Light: parseFloat(data.feeds[i].field5), SM: parseFloat(data.feeds[i].field6)})
      // this.setState({ temperature: [...this.state.temperature, data.feeds[i].field3] ,humidity:[...this.state.humidity, data.feeds[i].field4], co2:[...this.state.co2, data.feeds[i].field1], voc:[...this.state.voc, data.feeds[i].field2], light:[...this.state.light, data.feeds[i].field5], sm:[...this.state.sm, data.feeds[i].field6], ca:[...this.state.ca,  new Date(data.feeds[i].created_at).toLocaleString()] });
      }
  }


    // const data;
   

  render() {
   
    return (
      <div>
        <div>
          <Nav />
        </div>
        <div>
      <Grid container>
        
      <Grid item xs={12}>

        {/* <FormControl fullWidth>
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
            <MenuItem value={1440}>Daily</MenuItem>



          </Select>
        </FormControl> */}
        {/* <div><Button
          // onClick={handleSubmitStore1}
        >Submit</Button></div> */}

      </Grid>

      
      
      
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>

      </Grid>
      
      
        <ReactDataGrid
    idProperty="id"
    columns={columns}
    dataSource={dataSource}
    defaultFilterValue={filterValue}
    // enableColumnFilterContextMenu={enableColumnFilterContextMenu}
    style={gridStyle}
  />
      </div>

      </div>
      
    );
  }
}

// export { GetRequestAsyncAwait }; 
export default TempData;
