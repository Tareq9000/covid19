import { fetchAPI } from '../fetchAPI';

const initialState = {
  global: {},
  countries: [],
  country: "",
  spinning: false,
  showError: false,
  topData: {
    confirmed: {},
    deaths: {},
    recovered: {}
  },
  dateData: null,
  dateAlert: false,
}

const covidReducer = (state = initialState, action) => {

  switch(action.type){
    case 'SET_GLOBAL_COUNTRY_DATA':
      const totalNumbers = {
        totalConfirmed: action.payload.countries.map(country => country.TotalConfirmed),
        totalDeaths: action.payload.countries.map(country => country.TotalDeaths),
        totalRecovered: action.payload.countries.map(country => country.TotalRecovered)
      }
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
        topData: {
          confirmed:  action.payload.countries.filter((country) => (
                        country.TotalConfirmed === Math.max(...totalNumbers.totalConfirmed)
                      ))[0],
          deaths:      action.payload.countries.filter((country) => (
                        country.TotalDeaths === Math.max(...totalNumbers.totalDeaths)
                      ))[0],
          recovered:  action.payload.countries.filter((country) => (
                        country.TotalRecovered === Math.max(...totalNumbers.totalRecovered)
                      ))[0]
        },
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
      case 'SET_COUNTRY_DATE_DATA':
        return {
          ...state,
          dateData: action.payload.dateData.map(obj => {
            const d = new Date(obj.Date);
            return {
              Deaths: obj.Deaths, 
              Date: d.getDate()+'.'+d.getMonth()+'.'+d.getFullYear(), 
              Recovered: obj.Recovered, 
              Confirmed: obj.Confirmed
            }
          })
        }
        case 'SET_DATE_ALERT':
          return {
            ...state,
            dateAlert: action.payload.dateAlert
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

export const setDateAlert = ( dateAlert ) => {
  return ( dispatch ) => {
    
    dispatch({
      type : 'SET_DATE_ALERT',
      payload : {
        dateAlert: dateAlert
      }
    })
  }
}

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

export const getCountryDateData = ( countrySlug, startDate, endDate ) => {
  return ( dispatch ) => {
    fetchAPI('https://api.covid19api.com/country/'+countrySlug+'?from='+startDate+'T00:00:00Z&to='+endDate+'T00:00:00Z').then(fetchData => {
      console.log(fetchData[0])
      if(fetchData[0]){
        dispatch({
          type : 'SET_COUNTRY_DATE_DATA',
          payload : {
            dateData: fetchData[0]
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