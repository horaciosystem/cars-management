import initialState from '../fixtures/cars-fixture';
import rest from 'lodash/rest';
export const LOAD   = 'LOAD';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';
export const FILTER = 'FILTER';

let NEXT_ID = 3;

function getPaginatedItems(items, page = 1) {
	const per_page = 5,
	    offset = (page - 1) * per_page,
	    paginatedItems = rest(items, offset).slice(0, per_page);
	return {
		page: page,
		per_page: per_page,
		total: items.length,
		total_pages: Math.ceil(items.length / per_page),
		data: paginatedItems
	};
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FILTER:      
      return state;
    case LOAD:      
      return state;
    case REMOVE:
      return state.filter(car => car.id !== action.id);
    case CREATE:
      NEXT_ID = NEXT_ID + 1;
      const newCar = {...action.car, id: NEXT_ID};
      return [...state, newCar];
    case UPDATE:
      state = state.filter(car => car.id !== action.car.id);            
      return [...state, action.car];
    default:      
      return state;
  }
}

export function filterCars(query) {
  return { type: FILTER, query };
}

export function loadCars(page) {
  return { type: LOAD, page };
}

export function createCar(car) {
  return { type: CREATE, car };
}

export function updateCar(car) {
  return { type: UPDATE, car };
}

export function removeCar(id) {
  return { type: REMOVE, id };
}