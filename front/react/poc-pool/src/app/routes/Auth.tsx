import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from 'layouts/Auth';
import services from 'services';
import { getAccessToken } from 'utils/accessToken';

type AuthRouteProps = { children: JSX.Element };

const AuthRoute = ({ children }: AuthRouteProps): JSX.Element => {
	const toast = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		services.backend.user
			.get(getAccessToken())
			.then(() => {
				navigate('/dashboard');
				toast({
					title: 'Welcome back !',
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
			})
			.catch((error) => {
				console.error(error.response);
			});
	}, []);

	return <AuthLayout>{children}</AuthLayout>;
};

export default AuthRoute;
