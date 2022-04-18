import { Link } from 'react-router-dom';
import { Heading, Text } from '@chakra-ui/react';

function Home(): JSX.Element {
	return (
		<>
			<Heading color="tomato">Artists Book</Heading>
			<Text color="darkred">Manage your favorite artists</Text>
			<Link to="/register">Register</Link> | <Link to="/login">Login</Link>
		</>
	);
}

export default Home;
