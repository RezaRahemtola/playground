import { useState } from 'react';

import { StarIcon } from '@chakra-ui/icons';
import {
	Button,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
} from '@chakra-ui/react';

import Input from 'components/Input/Input';

import { CreateArtistBody } from 'services/backend/artist';

type AddArtistModalProps = {
	addArtist: (artist: CreateArtistBody) => void;
	isOpen: boolean;
	onClose: () => void;
};

const AddArtistModal = ({ addArtist, isOpen, onClose }: AddArtistModalProps): JSX.Element => {
	const [name, setName] = useState('');
	const [rating, setRating] = useState(0);
	const [nationality, setNationality] = useState('');
	const [musicGender, setMusicGender] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg="black.500">
				<ModalHeader color="white">Add an Artist</ModalHeader>
				<ModalCloseButton color="white" />
				<ModalBody pb={6}>
					<VStack align="start" spacing={{ base: '8px', md: '16px' }} w="100%">
						<Input inputType="white" placeholder="Artist's name..." onChange={(e) => setName(e.target.value)} />
						<Input
							inputType="white"
							placeholder="Artist's nationality..."
							onChange={(e) => setNationality(e.target.value)}
						/>
						<Input
							inputType="white"
							placeholder="Artist's music gender..."
							onChange={(e) => setMusicGender(e.target.value)}
						/>
						<Input
							inputType="white"
							placeholder="Artist's photo URL..."
							onChange={(e) => setPhotoUrl(e.target.value)}
						/>
						<HStack spacing="16px" align="center">
							<Text>Rate this artist :</Text>
							<HStack spacing="4px" h="27px">
								{Array.from(Array(5).keys()).map((index) => (
									<StarIcon
										key={index.toString()}
										color={rating > index ? 'yellow.500' : 'yellow.100'}
										onClick={() => {
											if (rating === index + 1) {
												setRating(0);
											} else {
												setRating(index + 1);
											}
										}}
									/>
								))}
							</HStack>
						</HStack>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button
						variant="inline"
						w="100%"
						onClick={() => {
							addArtist({
								name,
								rating,
								nationality,
								musicGender,
								photoUrl,
							});
							onClose();
						}}
					>
						Add
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddArtistModal;
