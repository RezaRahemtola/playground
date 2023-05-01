import { Heading, Avatar, Box, Center, Text, Link, useColorModeValue } from '@chakra-ui/react';

import { Artist } from 'types/artist';

function ArtistCard({ artist }: { artist: Artist }) {
	return (
		<Center py={6}>
			<Box
				maxW={'320px'}
				w={'full'}
				bg={useColorModeValue('white', 'gray.900')}
				boxShadow={'2xl'}
				rounded={'lg'}
				p={6}
				textAlign={'center'}
			>
				<Avatar
					size={'xl'}
					src={artist.photoUrl}
					mb={4}
					pos={'relative'}
					_after={{
						content: '""',
						w: 4,
						h: 4,
						bg: 'green.300',
						border: '2px solid white',
						rounded: 'full',
						pos: 'absolute',
						bottom: 0,
						right: 3,
					}}
				/>
				<Heading fontSize={'2xl'} fontFamily={'body'}>
					{artist.name}
				</Heading>
				<Text fontWeight={600} color={'gray.500'} mb={4}>
					{artist.nationality} artist doing {artist.musicGender}.
				</Text>
				<Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
					Actress, musician, songwriter and artist. PM for work inquires or{' '}
					<Link href={'#'} color={'blue.400'}>
						#tag
					</Link>{' '}
					me in your posts
				</Text>
			</Box>
		</Center>
	);
}

export default ArtistCard;
