import './App.css';
import React, {useState} from 'react';
import {DAppProvider, useAccountPkh, useTezos} from './dappstate';
import {SnackProvider, useSnackContext} from './snackstate';
import {appName, SettingsProvider, useSettingsContext} from './settings';
import Snack from './components/Snack';
import WalletButton from './components/WalletButton';

import {TezosToolkit, UnitValue} from '@taquito/taquito';
import {courier} from './settings.js';
import {SettingsPanel} from "./components/Settings";
import {Button, Container, createTheme, CssBaseline, Grid, Typography, useMediaQuery} from "@mui/material";
import {ThemeProvider} from "@mui/styles";

const Cell = (props) => {
    return (<Grid item xs={6}><Typography align="left" variant="subtitle2"
                                          style={props.data ? {fontFamily: courier} : {}}> {props.val}
    </Typography></Grid>)
}

const OwnershipData = (props) => {
    const {settings} = useSettingsContext();
    const [{assetid, owner, forsale}, setData] = useState(() => ({
        assetid: "",
        owner: "",
        forsale: "",
    }));
    const loadStorage = React.useCallback(async () => {
        const tezos = new TezosToolkit(settings.endpoint);
        const contract = await tezos.contract.at(settings.contract);
        const storage = await contract.storage();
        console.log(storage);
        setData({
            assetid: storage.assetid,
            owner: storage.owner,
            forsale: storage._state.toNumber() > 0 ? "For Sale" : "Not For Sale",
        });
    }, [assetid, owner, forsale]);
    if (assetid === "") loadStorage();
    return (
        <Container maxWidth='xs'>
            <Grid container direction="row" alignItems="center" spacing={1}>
                <Cell val="Asset Id"/><Cell val={assetid.substring(0, 20) + "..."} data/>
                <Cell val="Owner"/><Cell val={owner.substring(0, 20) + "..."} data/>
                <Cell val="Status"/><Cell val={forsale}/>
            </Grid>
        </Container>
    );
}

const BidButton = () => {
    const tezos = useTezos();
    const account = useAccountPkh();
    const {settings} = useSettingsContext();
    const {setInfoSnack, setErrorSnack, hideSnack} = useSnackContext();
    const bid = async () => {
        try {
            const contract = await tezos.wallet.at(settings.contract);
            const operation = await contract.methods.bid(UnitValue).send({amount: 10});
            const shorthash = operation.opHash.substring(0, 10) + "...";
            setInfoSnack(`waiting for ${shorthash} to be confirmed ...`);
            await operation.receipt();
            hideSnack();
        } catch (error) {
            setErrorSnack(error.message);
        }
    }
    return (
        <Button onClick={bid} variant="outlined" disabled={account === null}>
            post bid
        </Button>);
}

const ClaimButton = () => {
    const {settings} = useSettingsContext();
    const tezos = useTezos();
    const account = useAccountPkh();
    const {setInfoSnack, setErrorSnack, hideSnack} = useSnackContext();
    const claim = async () => {
        try {
            const contract = await tezos.wallet.at(settings.contract);
            const operation = await contract.methods.claim(UnitValue).send();
            const shorthash = operation.opHash.substring(0, 10) + "...";
            setInfoSnack(`waiting for ${shorthash} to be confirmed ...`);
            await operation.receipt();
            hideSnack();
        } catch (error) {
            setErrorSnack(error.message);
        }
    }
    return (
        <Button onClick={claim} variant="outlined" disabled={account === null}>
            Claim
        </Button>);
}

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    return (
        <DAppProvider appName={appName}>
            <SettingsProvider>
                <SnackProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <div className="App">
                            <Container style={{marginTop: 50}}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <OwnershipData/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BidButton/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ClaimButton/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <WalletButton/>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                        <SettingsPanel/>
                        <Snack/>
                    </ThemeProvider>
                </SnackProvider>
            </SettingsProvider>
        </DAppProvider>
    );
}

export default App;