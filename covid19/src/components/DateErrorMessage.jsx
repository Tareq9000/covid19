import React from 'react';
import { Alert } from '@material-ui/lab';

export const DateErrorMessage = () => {

  return (
    <div>
        <Alert severity="error">
            The date input isn`t valid!
        </Alert>
    </div>
  );
}
export default DateErrorMessage
