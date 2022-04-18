import { useState } from 'react';

import { Input, InputGroup, InputRightElement, Button, InputProps } from '@chakra-ui/react';

function PasswordInput({ ...rest }: InputProps) {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<InputGroup size="md">
			<Input pr="4.5rem" type={show ? 'text' : 'password'} placeholder="Enter password" {...rest} />
			<InputRightElement width="4.5rem">
				<Button h="1.75rem" size="sm" onClick={handleClick}>
					{show ? 'Hide' : 'Show'}
				</Button>
			</InputRightElement>
		</InputGroup>
	);
}

export default PasswordInput;
