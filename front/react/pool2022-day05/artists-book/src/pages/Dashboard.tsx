import { Grid, GridItem } from '@chakra-ui/react';

import TopBar from 'components/Bar/TopBar';
import ArtistCard from 'components/Card/ArtistCard';
import { Artist } from 'types/artist';

function Dashboard(): JSX.Element {
	const artist1: Artist = {
		id: '0',
		name: 'Alan Walker',
		nationality: 'Nowegian',
		musicGender: 'Electro',
		rating: 4,
		photoUrl: 'https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576',
	};

	return (
		<>
			<TopBar />
			<Grid templateColumns="repeat(5, 1fr)" gap={6}>
				<ArtistCard artist={artist1} />
			</Grid>
		</>
	);
}

export default Dashboard;
