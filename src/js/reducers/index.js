import { combineReducers } from 'redux';
import CarsReducer from './cars-reducer';

const rootReducer = combineReducers({
  cars: CarsReducer,
});

export default rootReducer;