import { StarIcon } from '@chakra-ui/icons';
import { HStack, Link, Text } from '@chakra-ui/react';

import { Music } from 'types/music';

const MusicCard = ({ music, index }: { music: Music; index: number }): JSX.Element => (
	<Link href={music.url} isExternal w="100%">
		<HStack px="16px" py="8px" bg="black.500" w="100%" borderRadius="base" justify="space-between">
			<HStack spacing="16px">
				<Text>{index}</Text>
				<Text>|</Text>
				<Text fontWeight="600">{music.name}</Text>
			</HStack>
			<HStack spacing="4px" h="27px">
				{Array.from(Array(5).keys()).map((starIndex) => (
					<StarIcon key={starIndex.toString()} color={music.rating > starIndex ? 'yellow.500' : 'yellow.100'} />
				))}
			</HStack>
		</HStack>
	</Link>
);

export default MusicCard;
