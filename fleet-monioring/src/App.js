import React from 'react';
import TripEntryForm from './components/TripForm';
import LubeEntryForm from './components/LubeEntryForm';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={withRouter(MainPage)} />
          <Route exact path="/trip-form" component={withRouter(TripEntryForm)} />
          <Route exact path="/lubrication-form" component={withRouter(LubeEntryForm)} />
        </Switch>
      </Router>
    );
  }
}

export default App;