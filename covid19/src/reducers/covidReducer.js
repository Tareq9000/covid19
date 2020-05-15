import { fetchAPI } from '../fetchAPI';

const initialState = {
  global: {}
}

const covidReducer = (state = initialState, action) => {

  switch(action.type){
    case 'SET_GLOBAL':
      return {
        ...state,
        global: action.payload.global
      }
    default:
      return state
  }
}
export default covidReducer

export const getGlobalSummary = () => {
  return ( dispatch ) => {
    fetchAPI('https://api.covid19api.com/summary').then(fetchData => {

      dispatch({
        type : 'SET_GLOBAL',
        payload : {
          global : fetchData[0].Global
        }
      })
    })
  }
}