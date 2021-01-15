import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import useGlobalFilter from 'react-table';
import 'react-table/react-table.css'; 
import moment from 'moment';
import AddTrain from './AddTrain';
import EditTrain from './EditTrain';
import Button from '@material-ui/core/Button';
import Charts from './Charts';
import CustTrainings from './CustTrainings';
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

export default function TrainList(){
    
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const date = trainings.date;
    useEffect(() => fetchData(), []);
 
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
       
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
    const deleteTrain = (link) => {
        console.log(link)
        if (window.confirm('Are you sure?')){
        fetch(link, {method: 'DELETE'})
        .then(handleClick())
        .then(response => fetchData())
        .catch(err => console.error(err))   
    }
}
    const dateFilter = (date) => {
        const day = moment(date).format('DD')
        const month = moment(date).format('MM')
        const year = moment(date).format('YYYY')
        console.log(day)
        console.log(month)
        console.log(year)
    }

    const columns = [
     
        { Header: "Date & time", 
        accessor: 'date',
        Cell : accessor => {
            const customdate = moment(accessor.original.date).format('LLL')
            dateFilter(customdate)
            return customdate
        },
        width: 300
        },
       
        {
            Header: 'Duration',
            accessor: 'duration',
            filterMethod:  (filter, row) => filterNumber(filter, row)
        },
        {
            Header: 'Activity',
            accessor: 'activity',
            filterable: true,
            filterMethod:  (filter, row) => filterCaseInsensitive(filter, row)
        },
     
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditTrain updateTrain={updateTrain} training={row.original} />
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links.0.href',
            Cell: row => <Button size="small" color="secondary" onClick={ () => deleteTrain(row.value)}>Delete</Button>
        },
        {
            show: false,
            Cell: row => <CustTrainings saveTrain={saveTrain}/>
        },
        {
            show: false,
            Cell: row => <Charts trainings={trainings}/>
        }
    ]

 const saveTrain = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const updateTrain = (training, link) => { 
        fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
    }
    return (
        <div>
          <AddTrain saveTrain={saveTrain}/> 
          <p><b>Note!</b> To modify the time, you can write it on the textfield if the suggestions are unfit</p>
          <ReactTable filterable defaultFilterMethod={filterCaseInsensitive} sortable={true} columns={columns} data={trainings}></ ReactTable>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
            The workout was deleted succesfully!
            </Alert>
            </Snackbar>
    </div>
        
    );
}

//This function is for making filtering case INsensitive, as it is automatically case sensitive
function filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    console.log(row.date)
    return (row[id] !== undefined ?         
    String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
    :           true    );
    
    }
//This function is for filtering an int value, as converting int to String didn't work for the 
//filterCaseInsensitive function
function filterNumber(filter, row) {
    const id = filter.pivotId || filter.id;
    console.log(row.date)
    return (row[id] !== undefined ?         
    String(row[id]).startsWith(filter.value)
    :           true    );
}




