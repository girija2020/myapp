
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

const filterValue = [
  { name: 'Date', operator: 'after', type: 'date', value: '', filterEditor: DateFilter},
  { name: 'Temperature', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter},
  { name: 'Humidity', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter },
  { name: 'Light', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter },
  { name: 'VOC', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter },
  { name: 'CO2', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter },
  { name: 'SM', operator: 'gte', type: 'number', value: '0', filterEditor: NumberFilter }
];



class Twelveh extends React.Component {
  
  
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

      
  }

  async componentDidMount() {
    // dataSource = [];
      const response = await fetch('https://api.thingspeak.com/channels/1837496/feeds.json?api_key=ZPJ8PYOOKBVK4DQT&start=2022-08-20?minutes=720');
      const data = await response.json();
      console.log(data.feeds[0].created_at);

      for (let i =0; i< data.feeds.length; i++){
        // data.forEach(item => newData.push({[item.country]: item.states})); 
      dataSource.push({id: i, Date: new Date( data.feeds[i].created_at).toLocaleDateString(),Time: new Date(data.feeds[i].created_at).toLocaleTimeString(), Temperature: parseFloat(data.feeds[i].field3), Humidity: parseFloat(data.feeds[i].field4), CO2: parseFloat(data.feeds[i].field1), VOC: parseFloat(data.feeds[i].field2), Light: parseFloat(data.feeds[i].field5), SM: parseFloat(data.feeds[i].field6)})
      // this.setState({ temperature: [...this.state.temperature, data.feeds[i].field3] ,humidity:[...this.state.humidity, data.feeds[i].field4], co2:[...this.state.co2, data.feeds[i].field1], voc:[...this.state.voc, data.feeds[i].field2], light:[...this.state.light, data.feeds[i].field5], sm:[...this.state.sm, data.feeds[i].field6], ca:[...this.state.ca,  new Date(data.feeds[i].created_at).toLocaleString()] });
      }
  }


    
    
    // const data;
   

  render() {
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
      
      
        <ReactDataGrid
    idProperty="id"
    columns={columns}
    dataSource={dataSource}
    defaultFilterValue={filterValue}
    // enableColumnFilterContextMenu={enableColumnFilterContextMenu}
    style={gridStyle}
  />
      </div>
    );
  }
}

// export { GetRequestAsyncAwait }; 
export default Twelveh;