import { fetchAPI } from '../fetchAPI';

const initialState = {
  global: {},
  countries: [],
  country: "",
  showError: false
}

const covidReducer = (state = initialState, action) => {

  switch(action.type){
    case 'SET_GLOBAL':
      return {
        ...state,
        global: action.payload.global,
        showError: false
      }
    case 'SET_COUNTRIES':
      return {
        ...state,
        countries: action.payload.countries,
        showError: false
      }
      case 'SET_COUNTRY':
        return {
          ...state,
          country: action.payload.country,
          global: action.payload.countryData[0],
          showError: false
        }
      case 'SHOW_ERROR':
        return {
          ...state,
          showError: true,
          country: ""
        }
    default:
      return state
  }
}
export default covidReducer



export const getGlobalSummary = () => {
  return ( dispatch ) => {
    fetchAPI('https://api.covid19api.com/summary').then(fetchData => {
      if(fetchData[0]){
        dispatch({
          type : 'SET_GLOBAL',
          payload : {
            global : fetchData[0].Global
          }
        })
      }else{
        dispatch({
          type : 'SHOW_ERROR'
        })
      }
    })
  }
}

export const getAllCountries = () => {
  return ( dispatch ) => {
    fetchAPI('https://api.covid19api.com/countries').then(fetchData => {
      if(fetchData[0]){
        dispatch({
          type : 'SET_COUNTRIES',
          payload : {
            countries : fetchData[0]
          }
        })
      }else{
        dispatch({
          type : 'SHOW_ERROR'
        })
      }
    })
  }
}

export const getSingleCountry = ( countrySlug ) => {
  return ( dispatch ) => {
    fetchAPI('https://api.covid19api.com/summary').then(fetchData => {
      if(fetchData[0]){
        dispatch({
          type : 'SET_COUNTRY',
          payload : {
            countryData : fetchData[0].Countries.filter((country) => (
                            country.Slug === countrySlug
            )),
            country: countrySlug
          }
        })
      }else{
        dispatch({
          type : 'SHOW_ERROR'
        })
      }
    })
  }
}