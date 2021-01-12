import React, {useState} from 'react';
import ReactTable from 'react-table';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddTrain from './AddTrain';
import moment from 'moment';
export default function CustTrainings(props){
    const [open, setOpen] = React.useState(false);
    const [workout, setWorkout] = useState([]);
    
    const fetchData = (props) => {
        console.log(props.ctraining)
        console.log(props.cust)
        fetch(props) //tämä on se oikea treenilinkki
        .then(response => response.json())
        .then(data => setWorkout(data.content))
    }
    const handleClickOpen = () => {
        fetchData(props.ctraining);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveTrain = (workout) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
  
        return (
            <div>
                <Button color="primary" onClick={handleClickOpen}>
            Workouts
          </Button>
          <Dialog open={open} onClose={handleClose} >
              <DialogContent>
            <div>
              <h2>Workouts</h2>
              
              <table>
                  <tbody>
                      <tr><th>Activity</th><th>Duration</th><th>Date</th></tr>
                      {
                      workout.map((workout) =>
                      {
                          if(workout.links != null){
                              return (<tr key={workout.links[0].href}>
                                <td>{workout.activity}</td>
                                <td>{workout.duration}</td>
                                <td>{moment(workout.date).format('LLL')}</td>
                                </tr>)
                          }else{
                              return(<p>No workouts to show</p>)
                          }
                      }
                      )}

              </tbody>
              </table>
              </div>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose} color="primary">
                 Cancel
                 </Button>
              <AddTrain saveTrain={saveTrain} customer={props.cust} /> 
              </DialogActions>
              </Dialog>
            
            </div>
        );
    }



