import { Input, Button, Link } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import { useState } from 'react';

import PasswordInput from 'components/Input/PasswordInput';

function Register(): JSX.Element {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	return (
		<>
			<Input placeholder="Email" onChange={(evt) => setEmail(evt.target.value)} />
			<PasswordInput onChange={(evt) => setPassword(evt.target.value)} />
			<PasswordInput onChange={(evt) => setPasswordConfirmation(evt.target.value)} />
			<Button
				onClick={() =>
					console.log(`email: ${email}, password: ${password}, passwordConfimation: ${passwordConfirmation}`)
				}
			>
				Submit
			</Button>
			<Link as={RouteLink} to="/login">
				Login
			</Link>
		</>
	);
}

export default Register;
