import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useSnackContext } from '../snackstate';

const Snack = () => {
	const { snackState, hideSnack } = useSnackContext();
	const handleClose = (_: Event | React.SyntheticEvent<Element, Event>, reason = '') => {
		if (reason === 'clickaway') {
			return;
		}

		hideSnack();
	};
	return (
		<Snackbar
			open={snackState.show}
			onClose={handleClose}
			autoHideDuration={10000}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			key={'bottomcenter'}
		>
			<MuiAlert
				elevation={6}
				variant="filled"
				onClose={handleClose}
				severity={snackState.severity}
				children={snackState.msg}
			/>
		</Snackbar>
	);
};

export default Snack;
