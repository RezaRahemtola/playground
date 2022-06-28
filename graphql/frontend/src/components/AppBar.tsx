import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			height: '8vh',
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			textAlign: 'center',
			flexGrow: 1,
		},
	}),
);

function ProductAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h4" className={classes.title}>
						GraphQL Products
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default ProductAppBar;
