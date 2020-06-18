import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

import { getCountryDateData, setSpinner } from '../reducers/covidReducer.js';
import DateChart from './DateChart.jsx';

import { connect } from 'react-redux';

import styles from '../styles/DateSummary.module.css';

export class DateSummary extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            startDate: "", 
            endDate: ""
        }
    }
    componentDidUpdate=()=>{
        const {startDate, endDate} = this.state

        if(startDate != "" && endDate != ""){

            const {country, getCountryDateData} = this.props
            getCountryDateData(country, startDate, endDate)
        }
    }
    startDateHandler=(event)=>{
        this.setState({startDate: event.target.value})
    }
    endDateHandler=(event)=>{
        this.setState({endDate: event.target.value})
    }
    
    render() {

        return (
            <div>
                <div id={styles.select_box}>
                    <div className={styles.date_picker}>
                        <TextField
                            id="date"
                            label="Start date"
                            type="date"
                            onChange={this.startDateHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={styles.date_picker}>
                        <TextField
                            id="date"
                            label="End date"
                            type="date"
                            onChange={this.endDateHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                
                <DateChart/>

            </div>
    )}
}

const mapStateToProps = ( state ) => {
    const { country } = state.covidReducer

    return {
        country: country
    }
}
const mapDispatchToProps = ( dispatch ) => {

    return {
        getCountryDateData: (countrySlug, startDate, endDate) => (
            dispatch(setSpinner(true)),
            dispatch(getCountryDateData(countrySlug, startDate, endDate))
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSummary);