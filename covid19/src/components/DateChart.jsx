import React, {Component} from 'react';

import { connect } from 'react-redux';

import styles from '../styles/DateChart.module.css';

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';

export class DateChart extends Component {
    
    render() {

        const { dateData } = this.props
        
        return dateData ? (
            <div id={styles.chart_box}>

                <Paper>
                    <Chart
                    data={dateData}
                    >
                    <ArgumentAxis max={5} />
                    <ValueAxis />
                    <LineSeries
                        name="Confirmed"
                        valueField="Confirmed"
                        argumentField="Date"
                    />
                    <LineSeries
                        name="Deaths"
                        valueField="Deaths"
                        argumentField="Date"
                    />
                    <LineSeries
                        name="Recovered"
                        valueField="Recovered"
                        argumentField="Date"
                    />
                    <Legend position="right"  />
                    
                    </Chart>
                </Paper>

            </div>
    ) : <div></div>}
}

const mapStateToProps = ( state ) => {
    const { dateData } = state.covidReducer
    return {
        dateData: dateData
    }
}

export default connect(mapStateToProps)(DateChart);