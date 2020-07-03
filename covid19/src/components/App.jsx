import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import About from './About.jsx';
import Summary from './Summary.jsx';
import { Container, AppBar, IconButton, Toolbar } from '@material-ui/core';
import styles from '../styles/App.module.css';

import { connect } from 'react-redux';
import Spinner from 'react-spinner-material';
import ErrorMessage from './ErrorMessage.jsx';

export const App = (props) => {
  const { showError, spinning } = props

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" aria-label="menu">
              <Link className={styles.navLink} to="/summary">Summary</Link>
            </IconButton>
            
            <IconButton edge="start" color="inherit" aria-label="menu">
            <Link className={styles.navLink} to="/about">About</Link>
            </IconButton>
          </Toolbar>
        </AppBar>

        <div id={styles.app_body}>
          <Container>
            {
              !showError ? <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/summary">
                  <Summary />
                </Route>
                <Route path="/">
                  <Summary />
                </Route>
              </Switch> : <ErrorMessage />
            }
            <div className={styles.spinner_box}>
              <Spinner
                size={40}
                spinnerColor={'black'}
                spinnerWidth={5}
                visible={spinning}
              />
            </div>
          </Container>
          </div>
      </div>
    </Router>
  )
}
App.propTypes = {
  showError: PropTypes.bool,
  spinning: PropTypes.bool,
}

const mapStateToProps = ( state ) => {
  const { showError, spinning } = state.covidReducer

  return { showError, spinning }
}
export default connect(mapStateToProps)(App)
