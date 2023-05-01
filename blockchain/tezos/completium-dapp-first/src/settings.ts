import constate from 'constate';
import { useState } from 'react';

type TSettingsState = {
	network: string;
	endpoint: string;
	contract: string;
	show: boolean;
};

export function useSettings() {
	const [settings, setState] = useState<TSettingsState>({
		network: 'ghostnet',
		endpoint: 'https://ghostnet.ecadinfra.com',
		contract: 'KT1MsS8fWEjhhPVYYNwqx1LFfMMVCJigRkch',
		show: false,
	});

	const setNetwork = (nw: string) => {
		setState((s) => {
			return { ...s, network: nw };
		});
	};

	const setEndpoint = (ep: string) => {
		setState((s) => {
			return { ...s, endpoint: ep };
		});
	};

	const setContract = (c: string) => {
		setState((s) => {
			return { ...s, contract: c };
		});
	};

	const hideSettings = () => {
		setState((s) => {
			return { ...s, show: false };
		});
	};

	const showSettings = () => {
		setState((s) => {
			return { ...s, show: true };
		});
	};

	const getBcdUrl = () => {
		return 'https://better-call.dev/' + settings.network + '/' + settings.contract;
	};

	return { settings, setNetwork, setEndpoint, setContract, hideSettings, showSettings, getBcdUrl };
}

export const [SettingsProvider, useSettingsContext] = constate(useSettings);

export const appName = 'My First Completium DApp';

// fonts
export const courier = 'Courier Prime, monospace';
export const alegreya = 'Alegreya Sans SC, sans-serif';
