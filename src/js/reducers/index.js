import { combineReducers } from 'redux';
import CarsReducer from './cars-reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  cars: CarsReducer,
  form: formReducer,
});

export default rootReducer;