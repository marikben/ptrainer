import React from 'react';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import CustList from './components/CustList';
import TrainList from './components/TrainList';
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import Button from '@material-ui/core/Button';
import CustTrainings from './components/CustTrainings';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div  className={classes.root}>
      <h2>Personal trainer App</h2>
      <BrowserRouter>
      <div>
        <AppBar position="static" style={{ background: '#2E3B55' }}>
          
          <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        Navigation
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}><Link to="/"><Button>Home</Button></Link >{' '}</MenuItem>
        <MenuItem onClick={handleClose}><Link to="/customers"><Button>Customers</Button></Link>{' '}</MenuItem>
        <MenuItem onClick={handleClose}><Link to="/trainings"><Button>Workout schedule</Button></Link>{' '}</MenuItem>
        <MenuItem onClick={handleClose}><Link to="/calendar"><Button>Calendar</Button></Link>{' '}</MenuItem>
      </Menu>
     
      </AppBar>
      <Switch><Route exact path="/" component={Home}/>
      <Route path = "/customers" component={CustList}/>
      <Route path = "/trainings" component={TrainList}/>
      <Route path = "/calendar" component={Calendar}/>
      <Route path = "/customerworkouts" component={CustTrainings}/>
      <Route render={() => <h1> Page not found</h1>}/></Switch>
     
    
      </div></BrowserRouter>
    </div>
  );
}

export default App;
