import { Button, Input, Link } from '@chakra-ui/react';
import PasswordInput from 'components/Input/PasswordInput';
import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';

function Login(): JSX.Element {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<Input placeholder="Email" onChange={(evt) => setEmail(evt.target.value)} />
			<PasswordInput onChange={(evt) => setPassword(evt.target.value)} />
			<Button onClick={() => console.log(`email: ${email}, password: ${password}`)} id="login">
				<Link as={RouteLink} to="/dashboard">
					Submit
				</Link>
			</Button>
			<Link as={RouteLink} to="/register" id="register">
				Register
			</Link>
		</>
	);
}

export default Login;
