import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Users from './Users';
import UserDetail from './UserDetail';

function App() {
	return (
		<div className='App'>
			<Router>
				<Route exact={true} component={Users} path='/' />
				<Route component={UserDetail} path='/user/:id' />
			</Router>
		</div>
	);
}

export default App;
