import React from 'react';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import CustList from './components/CustList';
import TrainList from './components/TrainList';
import Home from "./components/Home";
import Button from '@material-ui/core/Button';
function App() {
  return (
    <div className="App">
      <h2>Personal trainer App</h2>
      <BrowserRouter>
      <div>
      <Link to="/"><Button>Home</Button></Link >{' '}
      <Link to="/customers"><Button>Customers</Button></Link>{' '}
      <Link to="/trainings"><Button>Workout schedule</Button></Link >{' '}
      <Switch><Route exact path="/" component={Home}/>
      <Route path = "/customers" component={CustList}/>
      <Route path = "/trainings" component={TrainList}/>
      <Route render={() => <h1> Page not found</h1>}/></Switch>
      </div></BrowserRouter>
    </div>
  );
}

export default App;
