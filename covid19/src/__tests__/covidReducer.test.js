import { covidReducer  } from '../reducers/covidReducer.js';

describe('covidReducer test', () => {

    it('should return the initial state', () => {
        expect(covidReducer(undefined, {})).toEqual(
          {
            global: {},
            countries: [],
            country: "",
            dateAlert: false,
            dateData: null,
            spinning: false,
            showError: false,
            topData: {
                confirmed: {},
                deaths: {},
                recovered: {}
            }
          }
        )
    })

    it('should show the error', () => {
      const action = {type : 'SHOW_ERROR'}
      expect(covidReducer(undefined, action)).toEqual(
        {
          global: {},
          countries: [],
          country: "",
          dateAlert: false,
          dateData: null,
          spinning: false,
          showError: true,
          topData: {
              confirmed: {},
              deaths: {},
              recovered: {}
          }
        }
      )
    })

    it('should set a country by slug', () => {
      const state = {
        global: {},
        countries: [
          {
            Country: "Switzerland",
            CountryCode: "CH",
            Date: "2020-06-19T08:43:19Z",
            NewConfirmed: 13,
            NewDeaths: 0,
            NewRecovered: 0,
            Slug: "switzerland",
            TotalConfirmed: 31200,
            TotalDeaths: 1956,
            TotalRecovered: 28900
          }
        ],
        country: "",
        dateAlert: false,
        dateData: null,
        spinning: false,
        showError: false,
        topData: {
            confirmed: {},
            deaths: {},
            recovered: {}
        }
      }
      const action = {
        type : 'SET_COUNTRY',
        payload : {
          country: "switzerland"
        }
      }
      expect(covidReducer(state, action)).toEqual(
        {
          global: {
            Country: "Switzerland",
            CountryCode: "CH",
            Date: "2020-06-19T08:43:19Z",
            NewConfirmed: 13,
            NewDeaths: 0,
            NewRecovered: 0,
            Slug: "switzerland",
            TotalConfirmed: 31200,
            TotalDeaths: 1956,
            TotalRecovered: 28900
          },
          countries: [
            {
              Country: "Switzerland",
              CountryCode: "CH",
              Date: "2020-06-19T08:43:19Z",
              NewConfirmed: 13,
              NewDeaths: 0,
              NewRecovered: 0,
              Slug: "switzerland",
              TotalConfirmed: 31200,
              TotalDeaths: 1956,
              TotalRecovered: 28900
            }
          ],
          country: "switzerland",
          dateAlert: false,
          dateData: null,
          spinning: false,
          showError: false,
          topData: {
              confirmed: {},
              deaths: {},
              recovered: {}
          }
        }
      )
    })

    it('should set the spinner', () => {
      const action1 = {
        type : 'SET_SPINNER',
        payload: {
          spinning: true
        }
      }
      const action2 = {
        type : 'SET_SPINNER',
        payload: {
          spinning: false
        }
      }
      const state = {
        spinning: true,
      }
      expect(covidReducer(undefined, action1).spinning).toEqual(true)
      expect(covidReducer(state, action2).spinning).toEqual(false)
    })

    it('should set the global and the country data', () => {
      const action = {
        type : 'SET_GLOBAL_COUNTRY_DATA',
        payload : {
          global: {
            Country: "Global Country",
            TotalConfirmed: 181200,
            TotalDeaths: 14956,
            TotalRecovered: 228900
          },
          countries: [
            {
              Country: "Country one",
              TotalConfirmed: 31200,
              TotalDeaths: 1956,
              TotalRecovered: 28900
            },
            {
              Country: "Country two",
              TotalConfirmed: 61200,
              TotalDeaths: 1256,
              TotalRecovered: 28901
            }
          ]
        }
      }
      expect(covidReducer(undefined, action)).toEqual(
        {
          global: {
            Country: "Global Country",
            TotalConfirmed: 181200,
            TotalDeaths: 14956,
            TotalRecovered: 228900
          },
          countries: [
            {
              Country: "All Countries",
              CountryCode: "ac",
              Slug: "all countries",
              Country: "Global Country",
              TotalConfirmed: 181200,
              TotalDeaths: 14956,
              TotalRecovered: 228900
            },
            {
              Country: "Country one",
              TotalConfirmed: 31200,
              TotalDeaths: 1956,
              TotalRecovered: 28900
            },
            {
              Country: "Country two",
              TotalConfirmed: 61200,
              TotalDeaths: 1256,
              TotalRecovered: 28901
            }
          ],
          country: "all countries",
          dateAlert: false,
          dateData: null,
          spinning: false,
          showError: false,
          topData: {
              confirmed: {
                Country: "Country two",
                TotalConfirmed: 61200,
                TotalDeaths: 1256,
                TotalRecovered: 28901
              },
              deaths: {
                Country: "Country one",
                TotalConfirmed: 31200,
                TotalDeaths: 1956,
                TotalRecovered: 28900
              },
              recovered: {
                Country: "Country two",
                TotalConfirmed: 61200,
                TotalDeaths: 1256,
                TotalRecovered: 28901
              }
          }
        }
      )
    })
    it('should remove the error', () => {
      const action1 = {
        type : 'SET_COUNTRY',
        payload : {
          country: '',
          countries: [],
        },
      }
      const action2 = {
        type : 'SET_GLOBAL_COUNTRY_DATA',
        payload : {
          country: '',
          countries: [],
          global: {},
        },
      }
      const state = {
        global: {},
        countries: [],
        country: "",
        dateAlert: false,
        dateData: null,
        spinning: false,
        showError: true,
        topData: {
            confirmed: {},
            deaths: {},
            recovered: {},
        },
      }
      expect(covidReducer(state, action1).showError).toEqual(false)
      expect(covidReducer(state, action2).showError).toEqual(false)
    })

    it('should set the date based data', () => {
      const action = {
        type : 'SET_COUNTRY_DATE_DATA',
        payload : {
          dateData: [
            {
              Deaths: '3',
              Recovered: '127',
              Confirmed: '232',
              Date: '2020-6-24',
            }
          ]
        },
      }
      expect(covidReducer(undefined, action).dateData).toEqual(
        [
          {
            Deaths: '3',
            Recovered: '127',
            Confirmed: '232',
            Date: '24.6.2020',
          }
        ]
      )
  })

  it('should set date alert', () => {
    const action1 = {
      type : 'SET_DATE_ALERT',
      payload : {
        dateAlert: true,
      },
    }
    const action2 = {
      type : 'SET_DATE_ALERT',
      payload : {
        dateAlert: false,
      },
    }
    const state = {
      dateAlert: true,
    }
    expect(covidReducer(undefined, action1).dateAlert).toEqual(true)
    expect(covidReducer(state, action2).dateAlert).toEqual(false)
  })

});