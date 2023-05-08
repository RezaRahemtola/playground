import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PrivateLayout from 'layouts/Private';
import services from 'services';
import { getAccessToken } from 'utils/accessToken';

type PrivateRouteProps = { children: JSX.Element };

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
	const toast = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		services.backend.user
			.get(getAccessToken())
			.then(() => {})
			.catch((error) => {
				console.error(error.response);
				navigate('/');
				toast({
					title: 'Unauthorized',
					status: 'error',
					duration: 3000,
					isClosable: true,
				});
			});
	}, []);

	return <PrivateLayout>{children}</PrivateLayout>;
};

export default PrivateRoute;
