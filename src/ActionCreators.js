import { urlMap } from './utils';

export function getCity() {
  return {
    url: urlMap.cityUrl,
    params: {
      format: 'json',
    },
    types: ['GET_CITY_LOADING', 'GET_CITY_SUCESS', 'GET_CITY_FAIL'],
  };
}

export function getWeather(city) {
  return {
    url: urlMap.weatherUrl,
    params: {
      city: encodeURI(city),
    },
    types: ['GET_WEATHER_LOADING', 'GET_WEATHER_SUCESS', 'GET_WEATHER_FAIL'],
  };
}

export function getCityThenWeather() {
  return [
    getCity(),
    (dispatch, getState) => {
      const state = getState();
      const city = state.report.city;

      return dispatch(getWeather(city));
    },
    (dispatch, getState) => {
      console.log(getState());
    },
  ];
}
