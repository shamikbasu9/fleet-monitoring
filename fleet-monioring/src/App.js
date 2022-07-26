import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TripEntryForm from './components/TripForm';

function App() {
  return (
    <Router>
			<Switch>
				<Route path='/trip-form' component={TripEntryForm}/>
			</Switch>
		</Router>
  );
}

export default App;