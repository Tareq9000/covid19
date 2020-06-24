import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

import { getCountryDateData, setSpinner, setDateAlert } from '../reducers/covidReducer.js';
import DateChart from './DateChart.jsx';

import { connect } from 'react-redux';

import styles from '../styles/DateSummary.module.css';
import DateErrorMessage from './DateErrorMessage.jsx';

export class DateSummary extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            startDate: '', 
            endDate: '',
        }
    }
    componentDidUpdate=()=>{
        const {startDate, endDate} = this.state

        if(startDate != '' && endDate != ''){

            if(startDate >= endDate){
                setDateAlert( true )

            }else {
                const {country, getCountryDateData, setDateAlert} = this.props
                setDateAlert( false )
                getCountryDateData(country, startDate, endDate)
            }
        }
    }
    startDateHandler=(event)=>{
        this.setState({startDate: event.target.value})
    }
    endDateHandler=(event)=>{
        const today = new Date().toISOString().split('T')[0]

        today < event.target.value ? 
        this.setState({endDate: today}) :
        this.setState({endDate: event.target.value})
    }
    
    render() {
        const { dateAlert } = this.props
        const { startDate, endDate } = this.state

        return (
            <div>
                <div id={styles.select_box}>
                    <div className={styles.date_picker}>
                        <TextField
                            id='date'
                            label='Start date'
                            type='date'
                            value={startDate}
                            onChange={this.startDateHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={styles.date_picker}>
                        <TextField
                            id='date'
                            label='End date'
                            type='date'
                            value={endDate}
                            onChange={this.endDateHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                
                {
                    dateAlert ? <DateErrorMessage /> : <DateChart />
                }

            </div>
    )}
}

const mapStateToProps = ( state ) => {
    const { country, dateAlert } = state.covidReducer

    return {
        country: country,
        dateAlert: dateAlert,
    }
}
const mapDispatchToProps = ( dispatch ) => {

    return {
        getCountryDateData: (countrySlug, startDate, endDate) => (
            
            dispatch(setSpinner(true)),
            dispatch(getCountryDateData(countrySlug, startDate, endDate))
        ),
        setDateAlert: ( bool ) => (
            dispatch(setDateAlert(bool))
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSummary);