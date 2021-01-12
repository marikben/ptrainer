import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import AddCust from './AddCust';
import EditCust from './EditCust';
import Button from '@material-ui/core/Button';
import CustTrainings from './CustTrainings'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  

export default function CustList(props){
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    
    }
    
    const handleClick = () => {
        setOpen(true);
      };
      
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const deleteCust = (link) => {
        console.log(link)
        if (window.confirm('Are you sure?')){
        fetch(link, {method: 'DELETE'})
        .then(handleClick())
        .then(response => fetchData())
        .catch(err => console.error(err))   
    }
}

    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            Header: 'Lastname',
            accessor: 'lastname',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress',
            sortable: true,
            filter: true,
            width: 200
        },
        {
            Header: 'Postcode',
            accessor: 'postcode',
            sortable: true,
            filter: true,
            width: 90
        },
        {
            Header: 'City',
            accessor: 'city',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            Header: 'Email',
            accessor: 'email',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            Header: 'Phone',
            accessor: 'phone',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            accessor: 'links.2.href',
            Cell: row => <CustTrainings ctraining={row.value} cust={row.original.links[0].href} />

        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditCust updateCust={updateCust} customer={row.original} />
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links.0.href',
            Cell: row => <Button size="small" color="secondary" onClick={ () => deleteCust(row.value)}>Delete</Button>
        }
    ]

    const saveCust = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const updateCust = (customer, link) => { 
        fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
    }

    return (
        <div>
        <AddCust saveCust={saveCust} />
        <ReactTable filterable defaultFilterMethod={filterCaseInsensitive} columns={columns} data={customers}></ ReactTable>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
            The customer was deleted succesfully!
            </Alert>
            </Snackbar>
    </div>
    );
    }

    function filterCaseInsensitive(filter, row) {
        const id = filter.pivotId || filter.id;
        console.log(row.date)
        return (row[id] !== undefined ?         
        String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
        :           true    );
    }
    