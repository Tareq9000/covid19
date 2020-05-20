import React, { Component } from 'react';
import { render } from 'react-dom';

import { connect } from 'react-redux';
import { getGlobalSummary } from '../reducers/covidReducer.js';

class Summary extends Component{

    componentDidMount(){
        this.props.setGlobal();
    }
    render() {
        const { newConfirmed, totalConfirmed, newDeaths, totalDeaths, newRecovered, totalRecovered } = this.props

        return (
            <div>
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
    let global = state.covidReducer.global
    return {
        newConfirmed: global.NewConfirmed,
        totalConfirmed: global.TotalConfirmed,
        newDeaths: global.NewDeaths,
        totalDeaths: global.TotalDeaths,
        newRecovered: global.NewRecovered,
        totalRecovered: global.TotalRecovered
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
      setGlobal: () => (
        dispatch(getGlobalSummary())
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
