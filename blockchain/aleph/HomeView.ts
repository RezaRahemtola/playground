import { Link as RouteLink } from 'react-router-dom';

import { Button, Link } from '@chakra-ui/react';

import OutlineButton from 'components/OutlineButton';
import Web3 from 'web3';
import { bufferToHex } from 'ethereumjs-util';
import { encrypt } from '@metamask/eth-sig-util';

const HomeView = (): JSX.Element => {
	const connectWeb3 = async () => {
		const web3 = new Web3((window as any).ethereum);

		try {
			await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
			const accounts = await web3.eth.getAccounts();

			const elem = document.getElementById('wallet-address');
			if (elem) {
				elem.innerText = accounts[0] || 'No account found';
				const encryptionKey = await (window as any).ethereum.request({
					method: 'eth_getEncryptionPublicKey',
					params: [accounts[0]],
				});

				const encryptedMessage = bufferToHex(
					Buffer.from(
						JSON.stringify(
							encrypt({
								publicKey: encryptionKey,
								data: 'hello world!',
								version: 'x25519-xsalsa20-poly1305',
							}),
						),
						'utf8',
					),
				);
				console.log(`Encrypted message: ${encryptedMessage}`);
				const decryptedMessage = await (window as any).ethereum.request({
					method: 'eth_decrypt',
					params: [encryptedMessage, accounts[0]],
				});
				console.log(`Decrypted message: ${decryptedMessage}`);
			}
		} catch (error) {
			console.error(error);
		}
		// let web3Provider;
		// if ((window as any).ethereum) {
		// 	web3Provider = (window as any).ethereum;
		// 	try {
		// 		await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
		// 	} catch (error) {
		// 		console.log('User denied account access');
		// 		web3Provider = undefined;
		// 	}
		// }
		// if (web3Provider !== undefined) {
		// 	await auth
		// }
		// return 0;
	};
	return (
		<>
			<Link as={RouteLink} to="/signup" w="100%">
				<Button variant="inline" w="100%" id="ipc-homeView-create-account-button">
					Create an account
				</Button>
			</Link>
			<Link as={RouteLink} to="/login" w="100%" id="ipc-homeView-login-button">
				<OutlineButton w="100%" text="Login" />
			</Link>
			<Button onClick={connectWeb3}>Connect with MetaMask</Button>
			<p id="wallet-address">None</p>
		</>
	);
};

export default HomeView;
