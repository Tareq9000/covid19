import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getGlobalSummary, getAllCountries, getSingleCountry, setSpinner } from '../reducers/covidReducer.js';
import { Select, MenuItem, InputLabel, FormControl, Paper, TableContainer, Table, TableCell, TableBody, TableRow } from '@material-ui/core';
import styles from '../styles/Summary.module.css';

import { Chart, BarSeries, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';

export class Summary extends Component{

    componentDidMount(){
        const { setGlobal, setAllCountries } = this.props
        
        setGlobal();
        setAllCountries();
    }

    createRow (name, number) {
        return { name, number };
    }

    render() {
        const { newConfirmed, totalConfirmed, newDeaths, totalDeaths, newRecovered, totalRecovered, countries, setCountry, country } = this.props

        const rows = [
            this.createRow('new confirmed', newConfirmed),
            this.createRow('total confirmed', totalConfirmed),
            this.createRow('new deaths', newDeaths),
            this.createRow('total deaths', totalDeaths),
            this.createRow('new recovered', newRecovered),
            this.createRow('total recovered', totalRecovered)
        ];

        return (
            <div>
                <FormControl>
                <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
                <Select className={styles.selectBox} value={country} onChange={setCountry}>
                    {countries.map(obj => (
                        <MenuItem key={obj.ISO2} value={obj.Slug}>{obj.Country}</MenuItem>
                    ))}
                </Select>
                </FormControl>
                
                <Paper>
                    <Chart data={rows}>
                        <ArgumentAxis />
                        <ValueAxis max={6} />
                        <BarSeries valueField="number" argumentField="name"/>
                    </Chart>
                </Paper>

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.number}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
        setGlobal: () => {
            dispatch(setSpinner(true))
            dispatch(getGlobalSummary())
        },
        setAllCountries: () => {
            dispatch(getAllCountries())
        },
        setCountry: ( event ) => {
            dispatch(setSpinner(true))
            dispatch(getSingleCountry(event.target.value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
