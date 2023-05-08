import { Flex, Grid, GridItem, HStack, useToast } from '@chakra-ui/react';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopBar from 'components/Bar/TopBar';
import ArtistCard from 'components/Card/ArtistCard';

import services from 'services';
import { CreateArtistBody } from 'services/backend/artist';
import { Artist } from 'types/artist';
import { getAccessToken } from 'utils/accessToken';

const Dashboard = (): JSX.Element => {
	const toast = useToast({ duration: 3000, isClosable: true });
	const navigate = useNavigate();
	const [artists, setArtists] = useState<Artist[]>([]);

	const getArtists = () => {
		services.backend.user
			.get(getAccessToken())
			.then((response) => {
				setArtists(response.data.user.artists);
			})
			.catch((error) => {
				console.error(error.response);
				if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
					toast({
						title: 'Internal Server Error',
						status: 'error',
					});
			});
	};

	const onAddArtist = (artist: CreateArtistBody) => {
		services.backend.artist
			.create(artist, getAccessToken())
			.then((response) => {
				navigate(`/dashboard/${response.data.artist.id}`);
				toast({
					title: `${response.data.artist.name} successfully added`,
					status: 'success',
				});
				getArtists();
			})
			.catch((error) => {
				console.error(error);
				if (error.response.status === StatusCodes.BAD_REQUEST)
					toast({
						title: 'Invalid Parameters',
						status: 'error',
					});
				if (error.response.status === StatusCodes.CONFLICT)
					toast({
						title: 'Name already used',
						status: 'error',
					});
				if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
					toast({
						title: 'Internal Server Error',
						status: 'error',
					});
			});
	};

	useEffect(() => {
		getArtists();
	}, []);

	return (
		<HStack align="start" mt="128px">
			<TopBar addArtist={(artist: CreateArtistBody) => onAddArtist(artist)} />
			<Flex w="100%" justify="center" align="center">
				<Grid
					w="100%"
					maxW={{ base: '400px', md: '100%', '2xl': '1400px' }}
					templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(3, 1fr)' }}
					gap="16px"
				>
					{artists.map((artist) => (
						<GridItem minW="100%" key={artist.id}>
							<ArtistCard artist={artist} onClick={() => navigate(`/dashboard/${artist.id}`)} />
						</GridItem>
					))}
				</Grid>
			</Flex>
		</HStack>
	);
};

export default Dashboard;
