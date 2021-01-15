import React, { PureComponent, useState, useEffect } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import _ from 'lodash';

export default function Charts(props){
    const jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
    const [trainings, setTrainings] = useState([]);
    useEffect(() => fetchData(), []);
   
  
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        
    }
    const ans = _(trainings)
    .groupBy("activity")
    .map((trainings) => ({
      activity: trainings[0].activity,
      duration: _.sumBy(trainings, 'duration')
      
    })).value()
   
    return(<div>  
      <h6>Click the bar for exact duration in minutes</h6>
      <BarChart
        width={700}
        height={300}
        data={ans}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity"  />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#8884d8" />
    
      </BarChart></div>)
}


