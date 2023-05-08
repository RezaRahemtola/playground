import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

type CustomInputProps = {
	inputType?: 'gray' | 'white';
};

const Input = ({ inputType = 'gray', ...rest }: CustomInputProps & InputProps): JSX.Element => (
	<ChakraInput
		border="2px solid"
		borderColor={inputType === 'gray' ? 'black.500' : 'black.300'}
		color="white"
		_focus={{ outline: 'none', borderColor: inputType === 'gray' ? 'black.300' : 'white' }}
		{...rest}
	/>
);

export default Input;
