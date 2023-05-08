import { useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';

import { Button, Link, Text, useToast, VStack } from '@chakra-ui/react';

import OutlineButton from 'components/Button/OutlineButton';
import Input from 'components/Input/Input';

import { StatusCodes } from 'http-status-codes';
import services from 'services';
import { setAccessToken } from 'utils/accessToken';

const Register = (): JSX.Element => {
	const navigate = useNavigate();
	const toast = useToast({ duration: 3000, isClosable: true });
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');

	const onRegister = () => {
		if (password !== confirmedPassword) {
			toast({
				title: 'Passwords are not equals',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}
		services.backend.auth
			.register({ email, password })
			.then((response) => {
				setAccessToken(response.data.accessToken);
				navigate('/dashboard');
				toast({
					title: 'Welcome!',
					status: 'success',
				});
			})
			.catch((error) => {
				console.error(error.response.data);
				if (error.response.status === StatusCodes.BAD_REQUEST)
					toast({
						title: 'Invalid Credentials',
						status: 'error',
					});
				if (error.response.status === StatusCodes.CONFLICT)
					toast({
						title: 'Email already used',
						status: 'error',
					});
				if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR)
					toast({
						title: 'Internal Server Error',
						status: 'error',
					});
			});
	};

	return (
		<VStack spacing={{ base: '48px', md: '56px', lg: '64px' }} w="100%">
			<VStack spacing={{ base: '16px', md: '24px', lg: '32px' }} w="100%">
				<VStack spacing={{ base: '8px', md: '16px' }} w="100%">
					<Input placeholder="Your email..." onChange={(e) => setEmail(e.target.value)} />
					<Input placeholder="Your password..." type="password" onChange={(e) => setPassword(e.target.value)} />
					<Input
						placeholder="Confirm your password..."
						type="password"
						onChange={(e) => setConfirmedPassword(e.target.value)}
					/>
				</VStack>
				<Button
					variant="inline"
					mt="16px"
					w="100%"
					type="submit"
					id="registerPage-register-button"
					onClick={onRegister}
				>
					Register
				</Button>
			</VStack>
			<VStack w="100%">
				<Text fontSize="14px">Already an account ?</Text>
				<Link as={RouteLink} to="/login" w="100%">
					<OutlineButton w="100%" text="Login" id="registerPage-login-button" />
				</Link>
			</VStack>
		</VStack>
	);
};

export default Register;
