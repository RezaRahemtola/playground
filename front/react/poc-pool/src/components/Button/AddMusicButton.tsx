import { useDisclosure } from '@chakra-ui/react';

import AddMusicModal from 'components/Modal/AddMusicModal';
import { CreateMusicBody } from 'services/backend/music';
import OutlineButton from './OutlineButton';

type AddMusicButtonProps = {
	addMusic: (newMusic: CreateMusicBody) => void;
};

const AddMusicButton = ({ addMusic }: AddMusicButtonProps): JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<OutlineButton w="100%" text="Add a music" onClick={onOpen} />

			<AddMusicModal addMusic={addMusic} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default AddMusicButton;
