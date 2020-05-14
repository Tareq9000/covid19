import { fetchAPI } from '../fetchAPI';

export const fetchThisGraph = ( fetchLink ) => {
    return ( dispatch ) => {
      fetchAPI(fetchLink).then(fetchData => {

        dispatch({
          type : 'ADD_DATA',
          payload : {
            data : fetchData[0]
          }
        })
      })
    }
  }