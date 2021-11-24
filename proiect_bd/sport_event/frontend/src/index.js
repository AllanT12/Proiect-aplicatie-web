import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Login from './components/login';
import Register from './components/register';
import UpdateUser from './components/UpdateUser';
import UpdateSport from './components/UpdateSport';
import AddSports from './components/AddSports';
import AddClubs from './components/AddClubs';
import AddEvents from './components/AddEvents';
import DeleteSports from './components/DeleteSport';
import DeleteEvents from './components/DeleteEvent';
import DeleteClub from './components/DeleteClub';
import Clubs from "./components/Clubs";
import JoinClub from "./components/JoinClub";
import Events from './components/Events';
import Logout from "./components/logout";
import EditRequest from "./components/EditRequest";
import ShowMembers from "./components/ShowMembers";
import Home from "./components/Home";

const routing = (
	<Router>
		<React.StrictMode>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/home" component={Events}/>
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/addSport" component={AddSports} />
				<Route path="/addClubs" component={AddClubs} />
				<Route path="/Clubs" component={Clubs} />
				<Route path="/Events" component={App} />
				<Route path="/updateUser" component={UpdateUser} />
				<Route path="/updateSport" component={UpdateSport} />
				<Route path="/addEvent" component={AddEvents} />
				<Route path="/deleteSports" component={DeleteSports} />
				<Route path="/deleteEvents" component={DeleteEvents} />
				<Route path="/deleteClub" component={DeleteClub} />
				<Route path="/joinClub" component={JoinClub}/>
				<Route path="/editRequest" component={EditRequest}/>
				<Route path="/showMembers" component={ShowMembers}/>
			</Switch>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
