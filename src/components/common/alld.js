import React from 'react';
import Plot from 'react-plotly.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';



class Alld extends React.Component {
  
  
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
        const response = await fetch('https://api.thingspeak.com/channels/1837496/feeds.json?api_key=ZPJ8PYOOKBVK4DQT&start=2022-08-20');
        const data = await response.json();
        for (let i =0; i< data.feeds.length; i++){
          // data.forEach(item => newData.push({[item.country]: item.states})); 
        this.setState({ temperature: [...this.state.temperature, data.feeds[i].field3] ,humidity:[...this.state.humidity, data.feeds[i].field4], co2:[...this.state.co2, data.feeds[i].field1], voc:[...this.state.voc, data.feeds[i].field2], light:[...this.state.light, data.feeds[i].field5], sm:[...this.state.sm, data.feeds[i].field6], ca:[...this.state.ca,  new Date(data.feeds[i].created_at).toLocaleString()] });
        }
        console.log(data.feeds[0].field1);
    }

    

    render() {
        const { temperature, humidity, co2,voc,light, sm, ca } = this.state;
        return (
            <div className="card text-center m-3">
                <h1 className="card-header">Graphs</h1>
            {/* //     <div className="card-body">
            //         Temperature: {temperature[0]}
            //         <br></br>
            //         Humidity: {(humidity[0])}
            //         <br></br>
            //         Light: {light[0]}<br></br>
            //         VOC: {voc[0]}<br></br>
            //         CO2: {co2[0]}<br></br>
            //         Soil Moisture: {sm[0]}<br></br>
            //         Creation Time: {ca[0]}
            //     </div> */}
                <Grid
  container
  spacing={10}
  paddingLeft='30vh'
  paddingTop='12vh'
  paddingRight='12vh'
  paddingBottom='12vh'
  marginBottom='12vh'
  marginTop='12vh'
  bgcolor='paleturquoise'
  direction="row"
  alignItems="center"
  justify="center"
  style={{ minHeight: '70vh'}}
 >
                <Card>
                  <CardContent>
                  <Plot
                  data={[
                    {
                      x: Object.values(ca),
                      y: Object.values(temperature),
                      type: 'scatter',
                      marker: {color: 'red'},
                    },
                  ]}
                  layout={{width: 700, height: 500, title: 'Temperature(C)'}}
                />
                </CardContent>
                </Card>
                <Card>
                  <CardContent>
                <Plot
                  data={[
                    {
                      x: Object.values(ca),
                      y: Object.values(humidity),
                      type: 'scatter',
                      marker: {color: 'red'},
                    },
                  ]}
                  layout={{width: 700, height: 500, title: 'Humidity(%)'}}
                />
                </CardContent>
                </Card>
                <Card>
                  <CardContent>
                <Plot
                  data={[
                    {
                      x: Object.values(ca),
                      y: Object.values(co2),
                      type: 'scatter',
                      marker: {color: 'red'},
                    },
                  ]}
                  layout={{width: 700, height: 500, title: 'CO2(ppm)'}}
                />
                </CardContent>
                </Card>
                <Card>
                  <CardContent>
                <Plot
                  data={[
                    {
                      x: Object.values(ca),
                      y: Object.values(voc),
                      type: 'scatter',
                      marker: {color: 'red'},
                    },
                  ]}
                  layout={{width: 700, height: 500, title: 'VOC(ppb)'}}
                />
                </CardContent>
                </Card>
                <Card>
                  <CardContent>
                <Plot
                  data={[
                    {
                      x: Object.values(ca),
                      y: Object.values(sm),
                      type: 'scatter',
                      marker: {color: 'red'},
                    },
                  ]}
                  layout={{width: 700, height: 500, title: 'Soil Moisture(%)'}}
                />
                </CardContent>
                </Card>
                <Card>
                  <CardContent>
                <Plot
                  data={[
                    {
                      x: Object.values(ca),
                      y: Object.values(light),
                      type: 'scatter',
                      marker: {color: 'red'},
                    },
                  ]}
                  layout={{width: 700, height: 500, title: 'Light(lx)'}}
                />
                </CardContent>
                </Card>
                </Grid>
          </div>
        );
    }
}

// export { GetRequestAsyncAwait }; 
export default Alld;