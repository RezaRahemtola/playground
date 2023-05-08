import { Text, VStack } from '@chakra-ui/react';

import colors from 'theme/foundations/colors';

type AuthProps = { children: JSX.Element };

const Auth = ({ children }: AuthProps): JSX.Element => (
	<VStack spacing="56px" mt={{ base: '96px', md: '132px' }}>
		<VStack spacing="16px">
			<Text
				fontSize={{ base: '32px', md: '56px', lg: '72px' }}
				fontWeight="extrabold"
				bgGradient={`linear-gradient(90deg, ${colors.blue[700]} 0%, ${colors.red[700]} 100%)`}
				bgClip="text"
				id="app-title"
				textAlign="center"
			>
				Artists Book
			</Text>
			<Text
				fontSize={{ base: '6px', '3xs': '10px', '2xs': '12px', xs: '14px', '2sm': '16px' }}
				id="app-sub-title"
				textAlign="center"
			>
				Manage your favorite Artists
			</Text>
		</VStack>
		<VStack w={{ base: '90%', md: '496px' }} pb={{ base: '32px', md: '48px', lg: '64px' }}>
			{children}
		</VStack>
	</VStack>
);

export default Auth;
