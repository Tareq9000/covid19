import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

import { getCountryDateData, setSpinner } from '../reducers/covidReducer.js';

import { connect } from 'react-redux';

export class DateSummary extends Component {
  
    dateHandler=(event)=>{
        console.log(event.target.value)
        const {country, getCountryDateData} = this.props
        getCountryDateData(country)
    }
    render() {
        return (
            <div>
                <TextField
                    id="date"
                    label="Start date"
                    type="date"
                    className="datepicker"
                    onChange={this.dateHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    label="End date"
                    type="date"
                    value="2020-06-01"
                    className="datepicker"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
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
        getCountryDateData: (countrySlug) => (
            dispatch(setSpinner(true)),
            dispatch(getCountryDateData(countrySlug))
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSummary);