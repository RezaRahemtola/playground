import { TezosToolkit } from '@taquito/taquito';
import { TempleWallet } from '@temple-wallet/dapp';
import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';

export const [DAppProvider, useWallet, useTezos, useAccountPkh, useReady, useConnect] = constate(
	useDApp,
	(v) => v.wallet,
	(v) => v.tezos,
	(v) => v.accountPkh,
	(v) => v.ready,
	(v) => v.connect,
);

type TWalletState = {
	wallet: TempleWallet | null;
	tezos: TezosToolkit | null;
	accountPkh: string;
};

function useDApp({ appName }: { appName: string }) {
	const [{ wallet, tezos, accountPkh }, setState] = useState<TWalletState>({
		wallet: null,
		tezos: null,
		accountPkh: '',
	});

	const ready = Boolean(tezos);

	useEffect(() => {
		return TempleWallet.onAvailabilityChange((available) => {
			setState({
				wallet: available ? new TempleWallet(appName) : null,
				tezos: null,
				accountPkh: '',
			});
		});
	}, [setState, appName]);

	type TConnectOpts = {
		forcePermission: boolean;
	};

	const connect = useCallback(
		async (network: string, opts?: TConnectOpts) => {
			try {
				if (!wallet) {
					throw new Error('Temple Wallet not available');
				}
				// TODO: we should type network as TempleWalletNetwork, but ghostnet is not in the list
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				await wallet.connect(network, opts);
				const tzs = wallet.toTezos();
				const pkh = await tzs.wallet.pkh();
				setState({
					wallet,
					tezos: tzs,
					accountPkh: pkh,
				});
			} catch (err: any) {
				alert(`Failed to connect to Temple Wallet: ${err.message}`);
			}
		},
		[setState, wallet],
	);

	return {
		wallet,
		tezos,
		accountPkh,
		ready,
		connect,
	};
}
