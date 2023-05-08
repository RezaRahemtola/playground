import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react';

import AddArtistModal from 'components/Modal/AddArtistModal';
import { CreateArtistBody } from 'services/backend/artist';

type AddArtistButtonProps = {
	addArtist: (artist: CreateArtistBody) => void;
};

const AddArtistButton = ({ addArtist, ...rest }: AddArtistButtonProps & ButtonProps): JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button variant="inline" borderRadius="lg" onClick={onOpen} {...rest}>
				Add an artist
			</Button>

			<AddArtistModal addArtist={addArtist} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default AddArtistButton;
