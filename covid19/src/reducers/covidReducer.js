import { fetchAPI } from '../fetchAPI';

const initialState = {
  global: {},
  countries: [],
  country: "",
  spinning: false,
  showError: false
}

const covidReducer = (state = initialState, action) => {

  switch(action.type){
    case 'SET_GLOBAL_COUNTRY_DATA':
      return {
        ...state,
        global: action.payload.global,
        countries: [  
                    {
                      Country: "All Countries",
                      CountryCode: "ac",
                      Slug: "all countries",
                      ...action.payload.global
                    },
                      ...action.payload.countries 
                   ],
        country: "all countries",
        showError: false
      }
    case 'SET_SPINNER':
      return {
        ...state,
        spinning: action.payload.spinning
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


export const setSpinner = ( spinning ) => {
  return ( dispatch ) => {
    
    dispatch({
      type : 'SET_SPINNER',
      payload : {
        spinning: spinning
      }
    })
  }
}

export const getGlobalAndCountriesData = () => {
  return ( dispatch ) => {
    fetchAPI('https://api.covid19api.com/summary').then(fetchData => {

      if(fetchData[0]){
        console.log(fetchData[0].Global, "GLOBAL")
        console.log(fetchData[0].Countries, "COUNTRYS")
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
    dispatch(setSpinner(false))
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
    dispatch(setSpinner(false))
  }
}