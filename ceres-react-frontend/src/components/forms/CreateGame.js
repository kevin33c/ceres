import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './Form.css';
import ReactSelect from "react-select";

import { countryListAllIsoData, swissCities, weatherOutcomes } from '../../services/data.services';

import Navbar from '../navbar/Navbar';

import {
    //Grid
    //, MenuItem
    //, Input
    Typography
    //, RadioGroup
    //, Radio
    //, FormHelperText
    //, InputLabel
    //, Select
    //, FormControl
    //, FormControlLabel
    //, Checkbox
    //, TextField
    //, FormGroup
    //, FormLabel
    //, Paper
    //, Button
    //, Box
} from '@mui/material'



function CreateGame() {

    const {
        //register,
        handleSubmit,
        control,
        watch,
        //formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
    };

    const gameType = watch("gameType");
    const country = watch("country");
    const city = watch("city");


    return (
        <div>
            <Navbar />
            <Typography variant="h6" align="center" margin="dense" sx={{ color: 'white' }}>
                Create a custom game
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Game Type</label>
                <Controller
                    name="gameType"
                    control={control}
                    render={({ field }) => (
                        <ReactSelect
                            isClearable
                            {...field}
                            options={[
                                { value: "weather", label: "Weather" },
                                { value: "flight", label: "Flight - Coming Soon", isDisabled: true },
                            ]}
                        />
                    )}
                />
                <hr />
                {gameType &&
                    <div>
                        <label>Country</label>
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <ReactSelect
                                    isClearable
                                    {...field}
                                    options={countryListAllIsoData}
                                />
                            )}
                        />
                    </div>
                }
                {country && gameType &&
                    <div>
                        <label>City/Region</label>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <ReactSelect
                                    isClearable
                                    {...field}
                                    options={swissCities.filter(cities => cities.country = country.value)}
                                />
                            )}
                        />
                    </div>
                }
                {country && gameType && city &&
                    <div>
                        <label>Outcome</label>
                        <Controller
                            name="weatherOutcome"
                            control={control}
                            render={({ field }) => (
                                <ReactSelect
                                    isClearable
                                    {...field}
                                    options={weatherOutcomes}
                                />
                            )}
                        />
                    </div>
                }
                <section>
                    <label>MUI Picker</label>
                </section>

                <input type="submit" value="Create Game" />
            </form>
        </div>
    );
}

export default CreateGame