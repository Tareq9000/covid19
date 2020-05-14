import { fetchAPI } from '../fetchAPI';

export const getGlobalSummary = () => {
    return ( dispatch ) => {
      fetchAPI('https://api.covid19api.com/summary').then(fetchData => {

        dispatch({
          type : 'SET_GLOBAL',
          payload : {
            Global : fetchData[0].Global
          }
        })
      })
    }
  }