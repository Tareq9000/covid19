import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getSingleCountry, setSpinner, getGlobalAndCountriesData } from '../reducers/covidReducer.js';

import { Select, MenuItem, InputLabel, FormControl, Paper, TableContainer, Table, TableCell, TableBody, TableHead, TableRow } from '@material-ui/core';
import styles from '../styles/Summary.module.css';

import { Chart, BarSeries, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';

import DateSummary from './DateSummary.jsx'

export class Summary extends Component{

    componentDidMount(){
        const { getGlobalAndCountriesData } = this.props
        getGlobalAndCountriesData();
    }

    createRow (name, number) {
        return { name, number };
    }

    render() {
        const { newConfirmed, 
                totalConfirmed, 
                newDeaths, 
                totalDeaths, 
                newRecovered, 
                totalRecovered, 
                countries, 
                getCountry, 
                country,
                topConfirmed,
                topDeaths,
                topRecovered } = this.props

        const rows = [
            this.createRow('new confirmed', newConfirmed),
            this.createRow('total confirmed', totalConfirmed),
            this.createRow('new deaths', newDeaths),
            this.createRow('total deaths', totalDeaths),
            this.createRow('new recovered', newRecovered),
            this.createRow('total recovered', totalRecovered),
        ];

        let isAllCountries = (country === 'all countries') ? true : false;

        return (
            <div>

                <div id={styles.select_box}>
                    <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
                    <Select className={styles.selectBox} value={country} onChange={getCountry}>
                        {countries.map(obj => (
                            <MenuItem key={obj.ISO2} value={obj.Slug}>{obj.Country}</MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                </div>
                
                <div id={styles.component_box}>

                    <div id={styles.chart_box}>
                        <Paper elevation={2}>
                            <Chart data={rows} height="550">
                                <ArgumentAxis />
                                <ValueAxis max={6} />
                                <BarSeries valueField="number" argumentField="name" />
                            </Chart>
                        </Paper>
                    </div>

                    <div id={styles.table_box}>

                        <TableContainer component={Paper}>
                            <Table aria-label="a dense table">
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
                    
                    
                        { isAllCountries ? <div className={styles.table2_box}>
                            <TableContainer component={Paper}>
                                <Table aria-label="a dense table">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell align="center"><span className={styles.table_head}>top data</span></TableCell>
                                            <TableCell align="center"><span className={styles.table_head}>country</span></TableCell>
                                            <TableCell align="center"><span className={styles.table_head}>number</span></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key="topConfirmed">
                                            <TableCell align="left">confirmed</TableCell>
                                            <TableCell>{topConfirmed.Country}</TableCell>
                                            <TableCell align="right">{topConfirmed.TotalConfirmed}</TableCell>
                                        </TableRow>
                                        <TableRow key="topDeaths">
                                            <TableCell align="left">deaths</TableCell>
                                            <TableCell>{topDeaths.Country}</TableCell>
                                            <TableCell align="right">{topDeaths.TotalDeaths}</TableCell>
                                        </TableRow>
                                        <TableRow key="topRecovered">
                                            <TableCell align="left">recovered</TableCell>
                                            <TableCell>{topRecovered.Country}</TableCell>
                                            <TableCell align="right">{topRecovered.TotalRecovered}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div> : null }

                     </div>

                </div>
                { !isAllCountries ? <DateSummary /> : null }
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    const { global, countries, country, topData } = state.covidReducer

    return global ? {
        newConfirmed: global.NewConfirmed,
        totalConfirmed: global.TotalConfirmed,
        newDeaths: global.NewDeaths,
        totalDeaths: global.TotalDeaths,
        newRecovered: global.NewRecovered,
        totalRecovered: global.TotalRecovered,
        countries: countries,
        country: country,
        topConfirmed: topData.confirmed,
        topDeaths: topData.deaths,
        topRecovered: topData.recovered,
    } : {
        newConfirmed: 0,
        totalConfirmed: 0,
        newDeaths: 0,
        totalDeaths: 0,
        newRecovered: 0,
        totalRecovered: 0,
        countries: countries,
        country: country,
        topConfirmed: {},
        topDeaths: {},
        topRecovered: {},
    }
}
const mapDispatchToProps = ( dispatch ) => {

    return {
        getGlobalAndCountriesData: () => (
            dispatch(setSpinner(true)),
            dispatch(getGlobalAndCountriesData())
        ),
        getCountry: ( event ) => (
            dispatch(setSpinner(true)),
            dispatch(getSingleCountry(event.target.value))
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
