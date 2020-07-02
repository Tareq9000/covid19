import React, { Component } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import { connect } from 'react-redux';
import styles from '../styles/ErrorMessage.module.css';
import { getGlobalAndCountriesData } from '../reducers/covidReducer.js';
import PropTypes from 'prop-types';

export class ErrorMessage extends Component{

  render() {
      const { tryAgain } = this.props
    return (
      <div className={styles.box}>
          <div className={styles.innerBox$}>
              <ErrorIcon className={styles.icon} />
              <div className={styles.text}>ERROR! It seems like there is a Problem with getting the data. Please try agin</div>
              <button onClick={tryAgain}>Try again</button>
          </div>
      </div>
    );
  }
}
ErrorMessage.propTypes = {
  tryAgain: PropTypes.func,
}

const mapDispatchToProps = ( dispatch ) => {

  return {
      tryAgain: () => (
          dispatch(getGlobalAndCountriesData())
      ),
  }
}
export default connect(null, mapDispatchToProps)(ErrorMessage)