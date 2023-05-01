import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom';

import Home from 'pages/Home';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';

function Routes(): JSX.Element {
	return (
		<BrowserRouter>
			<RouterRoutes>
				<Route path="/" element={<Home />} />
				<Route path="register" element={<Register />} />
				<Route path="login" element={<Login />} />
				<Route path="dashboard" element={<Dashboard />} />
			</RouterRoutes>
		</BrowserRouter>
	);
}

export default Routes;
