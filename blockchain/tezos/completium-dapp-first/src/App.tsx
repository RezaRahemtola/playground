import { useCallback, useState } from 'react';
import './App.css';
import Snack from './components/Snack';
import WalletButton from './components/WalletButton';
import { DAppProvider, useAccountPkh, useTezos } from './dappstate';
import { SettingsProvider, appName, useSettingsContext } from './settings';
import { SnackProvider, useSnackContext } from './snackstate';

import { Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { TezosToolkit, UnitValue } from '@taquito/taquito';
import { SettingsPanel } from './components/Settings';
import { courier } from './settings.js';

const Cell = ({ val, data }: { val: string; data?: boolean }) => (
	<Grid item xs={6}>
		<Typography align="left" variant="subtitle2" style={data ? { fontFamily: courier } : {}}>
			{' '}
			{val}
		</Typography>
	</Grid>
);

type TContractStorage = {
	assetid: string;
	owner: string;
	_state: any;
};

const OwnershipData = () => {
	const { settings } = useSettingsContext();
	const [{ assetid, owner, forsale }, setData] = useState({
		assetid: '',
		owner: '',
		forsale: '',
	});
	const loadStorage = useCallback(async () => {
		const tezos = new TezosToolkit(settings.endpoint);
		const contract = await tezos.contract.at(settings.contract);
		const storage: TContractStorage = await contract.storage();
		console.log(storage);
		setData({
			assetid: storage.assetid,
			owner: storage.owner,
			forsale: storage._state.toNumber() > 0 ? 'For Sale' : 'Not For Sale',
		});
	}, [assetid, owner, forsale]);
	if (assetid === '') loadStorage();
	return (
		<Container maxWidth="xs">
			<Grid container direction="row" alignItems="center" spacing={1}>
				<Cell val="Asset Id" />
				<Cell val={assetid.substring(0, 20) + '...'} data />
				<Cell val="Owner" />
				<Cell val={owner.substring(0, 20) + '...'} data />
				<Cell val="Status" />
				<Cell val={forsale} />
			</Grid>
		</Container>
	);
};

const BidButton = () => {
	const tezos = useTezos();
	const account = useAccountPkh();
	const { settings } = useSettingsContext();
	const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
	const bid = async () => {
		try {
			if (tezos === null) throw new Error('Not connected');
			console.log(tezos.wallet);
			const contract = await tezos.wallet.at(settings.contract);
			const operation = await contract.methods.bid(UnitValue).send({ amount: 10 });
			const shorthash = operation.opHash.substring(0, 10) + '...';
			setInfoSnack(`waiting for ${shorthash} to be confirmed ...`);
			await operation.receipt();
			hideSnack();
		} catch (error: any) {
			setErrorSnack(error.message);
		}
	};
	return (
		<Button onClick={bid} variant="outlined" disabled={account === null}>
			post bid
		</Button>
	);
};

const ClaimButton = () => {
	const { settings } = useSettingsContext();
	const tezos = useTezos();
	const account = useAccountPkh();
	const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
	const claim = async () => {
		try {
			if (tezos === null) throw new Error('Not connected');
			const contract = await tezos.wallet.at(settings.contract);
			const operation = await contract.methods.claim(UnitValue).send();
			const shorthash = operation.opHash.substring(0, 10) + '...';
			setInfoSnack(`waiting for ${shorthash} to be confirmed ...`);
			await operation.receipt();
			hideSnack();
		} catch (error: any) {
			setErrorSnack(error.message);
		}
	};
	return (
		<Button onClick={claim} variant="outlined" disabled={account === null}>
			Claim
		</Button>
	);
};

const App = () => (
	<DAppProvider appName={appName}>
		<SettingsProvider>
			<SnackProvider>
				<CssBaseline />
				<div className="App">
					<Container style={{ marginTop: 50 }}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<OwnershipData />
							</Grid>
							<Grid item xs={12}>
								<BidButton />
							</Grid>
							<Grid item xs={12}>
								<ClaimButton />
							</Grid>
							<Grid item xs={12}>
								<WalletButton />
							</Grid>
						</Grid>
					</Container>
				</div>
				<SettingsPanel />
				<Snack />
			</SnackProvider>
		</SettingsProvider>
	</DAppProvider>
);

export default App;
