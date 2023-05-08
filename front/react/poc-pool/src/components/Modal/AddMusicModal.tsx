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
import { useState } from 'react';

import Input from 'components/Input/Input';
import { CreateMusicBody } from 'services/backend/music';

type AddMusicModalProps = {
	addMusic: (newMusic: CreateMusicBody) => void;
	isOpen: boolean;
	onClose: () => void;
};

const AddMusicModal = ({ addMusic, isOpen, onClose }: AddMusicModalProps): JSX.Element => {
	const [name, setName] = useState('');
	const [rating, setRating] = useState(0);
	const [url, setUrl] = useState('');

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg="black.500">
				<ModalHeader color="white">Add an Music</ModalHeader>
				<ModalCloseButton color="white" />
				<ModalBody pb={6}>
					<VStack align="start" spacing={{ base: '8px', md: '16px' }} w="100%">
						<Input inputType="white" placeholder="Music's name..." onChange={(e) => setName(e.target.value)} />
						<Input inputType="white" placeholder="Music's URL..." onChange={(e) => setUrl(e.target.value)} />
						<HStack spacing="16px" align="center">
							<Text>Rate this Music :</Text>
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
							addMusic({
								name,
								rating,
								url,
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

export default AddMusicModal;
