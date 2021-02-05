import { BrowserRouter as Router, Route } from 'react-router-dom';
import Users from './Components/Users';
import UserDetail from './Components/UserDetail';
const Routers = (props) => {
	return (
		<div className=''>
			<Router>
				<Route exact component={Users} path='/' />
				<Route component={UserDetail} path='/user/:id' />
			</Router>
		</div>
	);
};

export default Routers;
