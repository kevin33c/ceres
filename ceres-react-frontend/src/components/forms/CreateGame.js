import * as React from 'react';
import Navbar from '../navbar/Navbar';
import './Form.css';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function CreateGame() {

    const [gameType, setGameType] = React.useState('');

    const handleChange = (event) => {
        setGameType(event.target.value);
    };

    return (
        <div >
            <Navbar />
            <div className="form-type">
                <FormControl className="form-wrapper">
                    <InputLabel htmlFor="my-input">Game Type</InputLabel>
                    <Select
                        labelId="select-game-type"
                        id="select-game-type"
                        value={gameType}
                        label="gameType"
                        onChange={handleChange}
                    >
                        <MenuItem value={'weather'}>Weather</MenuItem>
                        <MenuItem value={'flight'}>Flight</MenuItem>
                    </Select>
                    <FormHelperText id="my-helper-text">Select game type.</FormHelperText>
                </FormControl>
            </div>
        </div >
    )
}

export default CreateGame
