import { Center, Flex, Spinner, useToast, VStack } from '@chakra-ui/react';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopBar from 'components/Bar/TopBar';
import AddMusicButton from 'components/Button/AddMusicButton';
import ArtistShow from 'components/Card/ArtistShow';
import MusicCard from 'components/Card/MusicCard';

import services from 'services';
import { CreateArtistBody } from 'services/backend/artist';
import { CreateMusicBody } from 'services/backend/music';

import { Artist } from 'types/artist';
import { getAccessToken } from 'utils/accessToken';

const ArtistPage = () => {
	const toast = useToast({ duration: 3000, isClosable: true });
	const navigate = useNavigate();
	const [artist, setArtist] = useState<Artist | undefined>();

	const getArtist = () => {
		const artistId = window.location.href.split('/dashboard/')[1];

		if (artistId !== '') {
			services.backend.artist
				.get(artistId, getAccessToken())
				.then((response) => {
					setArtist(response.data.artist);
				})
				.catch((error) => {
					console.error(error);
					navigate('/dashboard');
					if (error.response.status === StatusCodes.BAD_REQUEST)
						toast({
							title: 'Invalid Artist ID',
							status: 'error',
						});
					if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
						toast({
							title: 'Internal Server Error',
							status: 'error',
						});
				});
		} else {
			navigate('/dashboard');
		}
	};

	const onAddMusic = (artistId: string, music: CreateMusicBody) => {
		services.backend.music
			.create(music, artistId, getAccessToken())
			.then(() => {
				toast({
					title: `${music.name} successfully added`,
					status: 'success',
				});
				getArtist();
			})
			.catch((error) => {
				console.error(error);
				if (error.response.status === StatusCodes.BAD_REQUEST)
					toast({
						title: 'Invalid Parameters',
						status: 'error',
					});
				if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
					toast({
						title: 'Internal Server Error',
						status: 'error',
					});
			});
	};

	const onAddArtist = (newArtist: CreateArtistBody) => {
		services.backend.artist
			.create(newArtist, getAccessToken())
			.then((data) => {
				navigate(`/dashboard/${data.data.artist.id}`);
				toast({
					title: `${data.data.artist.name} successfully added`,
					status: 'success',
				});
				getArtist();
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
		getArtist();
	}, []);

	if (!artist)
		return (
			<Center>
				<Spinner size="160px" />
			</Center>
		);

	return (
		<VStack align="start" mt="128px" spacing="64px">
			<TopBar addArtist={(newArtist: CreateArtistBody) => onAddArtist(newArtist)} />
			<Flex mt="0px !important" direction="column" w="100%" align="center">
				<ArtistShow artist={artist} />
				<VStack w="100%" maxW="560px" mt="80px">
					<AddMusicButton addMusic={(newMusic: CreateMusicBody) => onAddMusic(artist.id, newMusic)} />
					{artist.musics.map((music, index) => (
						<MusicCard key={music.id} music={music} index={index + 1} />
					))}
				</VStack>
			</Flex>
		</VStack>
	);
};

export default ArtistPage;
