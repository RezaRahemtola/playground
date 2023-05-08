import { StarIcon } from '@chakra-ui/icons';
import { HStack, Image, StackProps, Text, VStack } from '@chakra-ui/react';

import { Artist } from 'types/artist';

const ArtistCard = ({ artist, ...rest }: { artist: Artist } & StackProps): JSX.Element => (
	<HStack
		w="100%"
		px={{ base: '8px', md: '16px', lg: '24px' }}
		py={{ base: '8px', lg: '16px' }}
		borderRadius="lg"
		align="center"
		justify="space-between"
		bg="black.500"
		cursor="pointer"
		{...rest}
	>
		<Image
			src={artist.photoUrl}
			w={{ base: '48px', md: '64px', lg: '80px' }}
			h={{ base: '48px', md: '64px', lg: '80px' }}
			objectFit="cover"
			borderRadius="50%"
		/>
		<VStack justify="space-evenly" maxW="33%">
			<Text
				maxW="100%"
				whiteSpace="nowrap"
				textOverflow="ellipsis"
				overflow="hidden"
				fontSize={{ base: '16px', md: '17px', lg: '18px' }}
				fontWeight="600"
			>
				{artist.name}
			</Text>
			<Text maxW="100%" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
				{artist.nationality}
			</Text>
		</VStack>
		<VStack justify="space-evenly" maxW="33%">
			<HStack spacing="4px" h="27px">
				{Array.from(Array(5).keys()).map((index) => (
					<StarIcon key={index.toString()} color={artist.rating > index ? 'yellow.500' : 'yellow.100'} />
				))}
			</HStack>
			<Text maxW="100%" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
				{artist.musicGender}
			</Text>
		</VStack>
	</HStack>
);

export default ArtistCard;
