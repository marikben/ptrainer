import React, {useState, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';

export default function CustList(){
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .then(console.log(customers))
    }

    const columns = [
        {
            headerName: 'Firstname',
            field: 'firstname',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Lastname',
            field: 'lastname',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Street address',
            field: 'streetaddress',
            sortable: true,
            filter: true,
            width: 200
        },
        {
            headerNamer: 'Postcode',
            field: 'postcode',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'City',
            field: 'city',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Email',
            field: 'email',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Phone',
            field: 'phone',
            sortable: true,
            filter: true,
            width: 150
        },
    ]
    return (
        <div className="ag-theme-material" style={{height:'700px', width:'90%', margin:'auto'}}>
        <AgGridReact columnDefs={columns} rowData={customers}></ AgGridReact>
    </div>
    );
}