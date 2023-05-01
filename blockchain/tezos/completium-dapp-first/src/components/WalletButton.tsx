import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import React from 'react';
import { useConnect, useReady, useWallet } from '../dappstate.js';
import { useSettingsContext } from '../settings';

const WalletButton = () => {
	const ready = useReady();
	const wallet = useWallet();
	const connect = useConnect();
	const { settings } = useSettingsContext();
	const handleConnect = React.useCallback(async () => {
		try {
			await connect(settings.network);
		} catch (err: any) {
			alert(err.message);
		}
	}, [connect, settings.network]);
	return ready ? (
		<></>
	) : wallet ? (
		<Button variant="outlined" onClick={handleConnect}>
			connect to wallet
		</Button>
	) : (
		<Link href="https://templewallet.com/" rel="noopener" underline="none">
			<Button
				variant="contained"
				disableElevation
				style={{
					backgroundColor: '#ed8936',
					color: 'white',
					fontWeight: 'bold',
				}}
			>
				install Temple
			</Button>
		</Link>
	);
};

export default WalletButton;
