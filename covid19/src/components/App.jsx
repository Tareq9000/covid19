import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './About.jsx';
import Summary from './Summary.jsx';
import { Container, AppBar, IconButton, Toolbar } from '@material-ui/core';
import styles from '../styles/App.module.css';
import ErrorMessage from './ErrorMessage.jsx';

export class App extends Component{
  render(){
    const { showError, fetchMethod, country } = this.props
    console.log("showError", showError)
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
              </Switch> : <ErrorMessage tryAgainFunction={fetchMethod} functionParameter={country}/> 
            }
          </Container>

        </div>
      </Router>
    )
  }
}
const mapStateToProps = ( state ) => {
  const { showError, fetchMethod, country } = state.covidReducer.errorMSG

  return { showError, fetchMethod, country }
}
export default connect(mapStateToProps)(App)
