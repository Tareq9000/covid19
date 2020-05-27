import { fetchAPI } from '../fetchAPI';

const initialState = {
  global: {},
  countries: [],
  country: ""
}

const covidReducer = (state = initialState, action) => {

  switch(action.type){
    case 'SET_GLOBAL':
      return {
        ...state,
        global: action.payload.global
      }
    case 'SET_COUNTRIES':
      return {
        ...state,
        countries: action.payload.countries
      }
      case 'SET_COUNTRY':
        return {
          ...state,
          country: action.payload.country
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

export const getAllCountries = () => {
  return ( dispatch ) => {
    fetchAPI('https://api.covid19api.com/countries').then(fetchData => {

      dispatch({
        type : 'SET_COUNTRIES',
        payload : {
          countries : fetchData[0]
        }
      })
    })
  }
}