import React, {useState, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
export default function TrainList(){
    
    const [trainings, setTrainings] = useState([]);
    useEffect(() => fetchData(), []);
 
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
       
    }

    const columns = [
     
        { headerName: "Date & time", 
        field: 'date', 
        valueFormatter: function (params) {
            return moment(params.value).format('lll');
        },
    },
       
        {
            headerName: 'Duration',
            field: 'duration',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Activity',
            field: 'activity',
            sortable: true,
            filter: true
        },
    ]
    return (
        <div className="ag-theme-material" style={{height:'700px', width:'50%', margin:'auto'}}>
        <AgGridReact columnDefs={columns} rowData={trainings}></ AgGridReact>
    </div>
        
    );
}