import { useState } from 'react';
import { gameTypes, countryListAllIsoData, cities, weatherOutcomes } from '../../services/data.services';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AlertsService } from '../../services/alerts.services';
import { Web3Service } from '../../services/web3.services';

import {
    Typography
    , Modal
    , Button
    , Box
    , Select
    , MenuItem
    , TextField
    , InputLabel
    , FormControl
    , FormHelperText
} from '@mui/material';

const alert = new AlertsService();
const web3Service = new Web3Service();
let isConnected;

const style = {
    width: '30%',
    maxWidth: '100vw',
    maxHeight: '100%',
    position: 'fixed',
    top: '40%',
    left: '30%',
    transform: 'translate(0, -50%)',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function CreateGame() {

    const [open, setOpen] = useState(false);
    const [gameType, setGameType] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [outcome, setOutcome] = useState('');
    const [outcomeDate, setOutcomeDate] = useState('');
    const [connected, setConnected] = useState(true);

    const handleOpen = async () => {
        checkConnection()
        setOpen(true);
    }

    const handleClose = async () => {
        checkConnection()
        setOpen(false);
    }

    var minOutcomeDate = new Date();
    minOutcomeDate.setDate(minOutcomeDate.getDate() + 1);

    const handleGameTypeChange = (event) => {
        setGameType(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleOutcomeChange = (event) => {
        setOutcome(event.target.value);
    };

    //date event is an object with quite a lot of different methods, e.g. toString, etc.
    const handleOutcomeDateChange = (event) => {
        setOutcomeDate(event.toDateString());
    };


    function handleSubmit() {
        var data = {
            gameType: gameType
            , country: country
            , city: city
            , outcome: outcome
            , outcomeDate: outcomeDate
        }
        console.log(data);

        alert.success('🦄  Game Created!');
    }

    async function checkConnection() {
        isConnected = await web3Service.checkConnection();
        setConnected(isConnected)
    }

    async function connect() {
        await web3Service.connect();
        checkConnection();
    }

    function SubmitButton() {
        if (gameType && country && city && outcome && outcomeDate && connected) {
            return <div>
                <Typography align='center' variant='subtitle2' sx={{ mt: '15px'}}>
                    I want to create a {gameType} predicting game, I think that {city} will be {outcome} on {outcomeDate}.
                </Typography>
                <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: '15px', mb: '15px' }} >Create Game</Button>
            </div>
        } else {
            return <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: '15px', mb: '15px' }} disabled>Create Game</Button>
        };
    };

    return (
        <div>
            <Button size="small"
                sx={{ color: "black" }}
                onClick={handleOpen}>
                Create
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" align="center" margin="dense" sx={{ color: 'black' }}>
                        CREATE A CUSTOM GAME
                    </Typography>
                    <form>
                        <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
                            <InputLabel id="game-type">Game Type</InputLabel>
                            <Select
                                labelId="game-type"
                                id="game-type-select"
                                value={gameType}
                                label="Game Type"
                                onChange={handleGameTypeChange}
                            >
                                {gameTypes?.map(option => {
                                    return (
                                        <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                                            {option.label ?? option.value}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
                            <InputLabel id="country">Country</InputLabel>
                            <Select
                                labelId="country"
                                id="country-select"
                                value={country}
                                label="Country"
                                onChange={handleCountryChange}
                            >
                                {countryListAllIsoData?.map(option => {
                                    return (
                                        <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                                            {option.label ?? option.value}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
                            <InputLabel id="city">City</InputLabel>
                            <Select
                                labelId="city"
                                id="city-select"
                                value={city}
                                label="City"
                                onChange={handleCityChange}
                            >
                                {cities?.map(option => {
                                    return (
                                        <MenuItem key={option.value} value={option.label} disabled={option.disabled}>
                                            {option.label ?? option.value}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
                            <InputLabel id="outcome">Outcome</InputLabel>
                            <Select
                                labelId="outcome"
                                id="outcome-select"
                                value={outcome}
                                label="Outcome"
                                onChange={handleOutcomeChange}
                            >
                                {weatherOutcomes?.map(option => {
                                    return (
                                        <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                                            {option.label ?? option.value}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Outcome Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={outcomeDate}
                                    onChange={handleOutcomeDateChange}
                                    minDate={minOutcomeDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="contained"
                            onClick={connect}
                            sx={{ mt: '15px' }}
                            disabled={connected}>
                            Connect to Metamask
                        </Button>
                        {connected
                            ?<FormHelperText>You are connected to Metamask</FormHelperText>
                            :<FormHelperText>You need to connect to Metamask before creating a game</FormHelperText>
                        }
                        <SubmitButton />
                    </form>
                </Box>
            </Modal>
        </div >
    );
}

export default CreateGame