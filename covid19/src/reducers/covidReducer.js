import { fetchAPI } from '../fetchAPI';

const initialState = {
  global: {},
  countries: [],
  country: "",
  showError: false
}

const covidReducer = (state = initialState, action) => {

  switch(action.type){
    case 'SET_GLOBAL_COUNTRY_DATA':
      return {
        ...state,
        global: action.payload.global,
        countries: action.payload.countries,
        showError: false
      }
      case 'SET_COUNTRY':
        return {
          ...state,
          country: action.payload.country,
          global: state.countries.filter((country) => (
                    country.Slug === action.payload.country
                  ))[0],
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



export const getGlobalAndCountriesData = () => {
  return ( dispatch ) => {
    fetchAPI('https://api.covid19api.com/summary').then(fetchData => {
      if(fetchData[0]){
        dispatch({
          type : 'SET_GLOBAL_COUNTRY_DATA',
          payload : {
            global : fetchData[0].Global,
            countries: fetchData[0].Countries
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
    dispatch({
      type : 'SET_COUNTRY',
      payload : {
        country: countrySlug
      }
    })

  }
}