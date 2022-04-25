import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react';

import { Link as RouteLink } from 'react-router-dom';

import AddArtistButton from 'components/Button/AddArtistButton';

function TopBar() {
	return (
		<>
			<Box bg={useColorModeValue('gray.300', 'gray.1000')} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<Link as={RouteLink} to="/dashboard" id="dashboard">
						Dashboard
					</Link>
					<AddArtistButton />
				</Flex>
			</Box>
		</>
	);
}

export default TopBar;
