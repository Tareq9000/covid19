import React, { Component } from 'react';
import { Alert } from '@material-ui/lab';

export default class DateErrorMessage extends Component{

    render() {
      return (
        <div>
            <Alert severity="error">
                The date input isn't valid!
            </Alert>
        </div>
      );
    }
  }
