import { combineReducers } from 'redux';

const initialState = {
  city: '杭州',
  weather: {},
};

export default function WeatherReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CITY_SUCESS':
      return {
        ...state,
        city: action.payload.city,
      };
    case 'GET_WEATHER_SUCESS':
      return {
        ...state,
        weather: action.payload.data,
      };
    default:
      return state;
  }
}
