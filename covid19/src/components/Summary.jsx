import React, { Component } from 'react';
import { render } from 'react-dom';

import { connect } from 'react-redux';
import { getGlobalSummary, getAllCountries } from '../reducers/covidReducer.js';
import { Select, MenuItem, InputLabel } from '@material-ui/core';

class Summary extends Component{

    componentDidMount(){
        const { setGlobal, setAllCountries } = this.props
        
        setGlobal();
        setAllCountries();
    }

    render() {
        const { newConfirmed, totalConfirmed, newDeaths, totalDeaths, newRecovered, totalRecovered, countries, setCountry, country } = this.props
        console.log(countries, "countries")
        return (
            <div>
                <InputLabel>Country</InputLabel>
                <Select value={country} onChange={setCountry}>
                    {countries.map(obj => (
                        <MenuItem value={obj.Country}>{obj.Country}</MenuItem>
                    ))}
                </Select>
                <p>new confirmed: {newConfirmed}</p>
                <p>total confirmed: {totalConfirmed}</p>
                <p>new deaths: {newDeaths}</p>
                <p>total deaths: {totalDeaths}</p>
                <p>new recovered: {newRecovered}</p>
                <p>total recovered: {totalRecovered}</p>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    const { global, countries, country } = state.covidReducer

    return {
        newConfirmed: global.NewConfirmed,
        totalConfirmed: global.TotalConfirmed,
        newDeaths: global.NewDeaths,
        totalDeaths: global.TotalDeaths,
        newRecovered: global.NewRecovered,
        totalRecovered: global.TotalRecovered,
        countries: countries,
        country: country
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
        setGlobal: () => (
            dispatch(getGlobalSummary())
        ),
        setAllCountries: () => (
            dispatch(getAllCountries())
        ),
        setCountry: ( event ) => (
            dispatch({
                type: 'SET_COUNTRY',
                payload: {
                  country: event.target.value
                } 
            })
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
