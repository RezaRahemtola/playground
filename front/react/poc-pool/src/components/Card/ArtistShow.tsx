import { StarIcon } from '@chakra-ui/icons';
import { HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';

import { Artist } from 'types/artist';

const MusicCard = ({ artist }: { artist: Artist }): JSX.Element => (
	<Stack direction={{ base: 'column', md: 'row' }} w="100%" maxW="600px" align="center" justify="space-evenly">
		<Image
			src={artist.photoUrl}
			w={{ base: '160px', md: '200px', lg: '240px' }}
			h={{ base: '160px', md: '200px', lg: '240px' }}
			objectFit="cover"
			borderRadius="50%"
		/>
		<VStack justify="space-evenly">
			<Text
				maxW="100%"
				whiteSpace="nowrap"
				textOverflow="ellipsis"
				overflow="hidden"
				fontSize={{ base: '20px', md: '24px', lg: '28px' }}
				fontWeight="600"
			>
				{artist.name}
			</Text>
			<VStack>
				<Text>
					{artist.nationality} | {artist.musicGender}
				</Text>
				<HStack spacing="4px" h="27px">
					{Array.from(Array(5).keys()).map((index) => (
						<StarIcon key={index.toString()} color={artist.rating > index ? 'yellow.500' : 'yellow.100'} />
					))}
				</HStack>
			</VStack>
		</VStack>
	</Stack>
);

export default MusicCard;
