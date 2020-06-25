import React from 'react';
import { shallow } from '../enzyme';

import { covidReducer, setSpinner, getGlobalAndCountriesData, getSingleCountry } from '../reducers/covidReducer.js';

describe('covidReducer test', () => {

    it('should return the initial state', () => {
        expect(covidReducer(undefined, {})).toEqual(
          {
            global: {},
            countries: [],
            country: "",
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
      const action = {
        type : 'SET_SPINNER',
        payload: {
          spinning: true
        }
      }
      expect(covidReducer(undefined, action)).toEqual(
        {
          global: {},
          countries: [],
          country: "",
          spinning: true,
          showError: false,
          topData: {
              confirmed: {},
              deaths: {},
              recovered: {}
          }
        }
      )
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

});