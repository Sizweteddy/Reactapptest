import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Persons from './components/Persons';
import Person from './components/Person';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Persons />
				</Route>
				<Route exact path='/person/:name'>
					<Person />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
