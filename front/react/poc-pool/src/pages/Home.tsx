import { Button, Link } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';

import OutlineButton from 'components/Button/OutlineButton';

const Home = (): JSX.Element => (
	<>
		<Link as={RouteLink} to="/register" w="100%">
			<Button variant="inline" w="100%" id="homePage-register-button">
				Create an account
			</Button>
		</Link>
		<Link as={RouteLink} to="/login" w="100%" id="homePage-login-button">
			<OutlineButton w="100%" text="Login" />
		</Link>
	</>
);

export default Home;
