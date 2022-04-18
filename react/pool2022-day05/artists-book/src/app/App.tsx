import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

const App = (): JSX.Element => (
	<>
		<Center mt="160px">
			<VStack spacing="32px">
				<Text>It's time for you to start your frontend development</Text>
				<Spinner w="132px" h="132px" />
			</VStack>
		</Center>
	</>
);

export default App;
