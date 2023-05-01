import { AlertColor } from '@mui/material';
import constate from 'constate';
import { useState } from 'react';

type TSnackState = {
	show: boolean;
	severity: AlertColor;
	msg: string;
};

export function useSnackState() {
	const [snackState, setState] = useState<TSnackState>({
		show: false,
		severity: 'info',
		msg: '',
	});

	const setInfoSnack = (msg: string) => {
		setState({
			show: true,
			severity: 'info',
			msg: msg,
		});
	};

	const setErrorSnack = (txt: string) => {
		setState({
			show: true,
			severity: 'error',
			msg: txt,
		});
	};

	const hideSnack = () => {
		setState((v) => {
			return { ...v, show: false };
		});
	};

	return { snackState, setInfoSnack, setErrorSnack, hideSnack };
}

export const [SnackProvider, useSnackContext] = constate(useSnackState);
