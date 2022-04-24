import { Box, Flex, Link, Button, useColorModeValue } from '@chakra-ui/react';

import { Link as RouteLink } from 'react-router-dom';

function TopBar() {
	return (
		<>
			<Box bg={useColorModeValue('gray.300', 'gray.1000')} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<Link as={RouteLink} to="/dashboard" id="dashboard">
						Dashboard
					</Link>
					<Button colorScheme="orange">Add an artist</Button>
				</Flex>
			</Box>
		</>
	);
}

export default TopBar;
