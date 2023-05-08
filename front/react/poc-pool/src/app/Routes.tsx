import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

import AuthRoute from 'app/routes/Auth';
import PrivateRoute from 'app/routes/Private';

import ArtistPage from 'pages/Artist';
import DashboardPage from 'pages/Dashboard';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';

const Routes = (): JSX.Element => (
	<BrowserRouter>
		<RouterRoutes>
			<Route path="/" element={<AuthRoute children={<HomePage />} />} />
			<Route path="/register" element={<AuthRoute children={<RegisterPage />} />} />
			<Route path="/login" element={<AuthRoute children={<LoginPage />} />} />
			<Route path="/dashboard" element={<PrivateRoute children={<DashboardPage />} />} />
			<Route path="/dashboard/*" element={<PrivateRoute children={<ArtistPage />} />} />
			<Route path="*" element={<Navigate replace to="/" />} />
		</RouterRoutes>
	</BrowserRouter>
);

export default Routes;
