import { Link } from 'react-router-dom';
import { Heading, Text, VStack } from '@chakra-ui/react';

function Home(): JSX.Element {
	return (
		<>
			<VStack spacing={{base: '20px', md: '30px', lg: '40px'}}>
				<Heading color="tomato">Artists Book</Heading>
				<Text color="darkred" fontSize={{base: '14px', md: 'md', lg: 'lg'}}>Manage your favorite artists</Text>
				<Link to="/register">Register</Link> | <Link to="/login">Login</Link>
			</VStack>
		</>
	);
}

export default Home;
