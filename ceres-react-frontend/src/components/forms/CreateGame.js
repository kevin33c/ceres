import { useState } from 'react';
import { gameTypes, countryListAllIsoData, cities, weatherOutcomes } from '../../services/data.services';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

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
} from '@mui/material'

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [gameType, setGameType] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [outcome, setOutcome] = useState('');
    const [outcomeDate, setOutcomeDate] = useState('');

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


    const handleSubmit = () => {
        console.log({
            gameType: gameType
            , country: country
            , city: city
            , outcome: outcome
            , outcomeDate: outcomeDate
        });
    }

    return (
        <div>
            <Button size="small"
                sx={{ color: "white" }}
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
                                        <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
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
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: '15px', mb: '15px' }}>Submit</Button>
                    </form>
                </Box>
            </Modal>
        </div >
    );
}

export default CreateGame