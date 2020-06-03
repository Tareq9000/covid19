import React from "react";
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

export default function App() {
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
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/summary">
              <Summary />
            </Route>
            <Route path="/">
              <Summary />
            </Route>
          </Switch>
        </Container>

      </div>
    </Router>
  );
}
