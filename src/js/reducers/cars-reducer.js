import initialStateCars from '../fixtures/cars-fixture';
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

const initialState = {
  filterFunction: null,
  cars: initialStateCars
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FILTER: {      
      const filters = extractFiltersFromQuery(action.query);
      const filterFunction = (filters) => {
        const currying = (items) => {
          return filters.reduce((acc, filter) => {     
            let newItems = acc.filter(car => 
              car.combustivel.toLowerCase().includes(filter.toLowerCase()) 
                || car.marca.toLowerCase().includes(filter.toLowerCase())
            );
            return acc = newItems;
          }, items);
        }
        return currying;
      }
      let foo = filterFunction(filters);
      return {...state, filterFunction: foo};
    }
    case LOAD:      
      return state;
    case REMOVE: {
      const cars = state.cars.filter(car => car.id !== action.id);
      return {...state, cars};
    }
    case CREATE: {
      NEXT_ID = NEXT_ID + 1;
      const newCar = {...action.car, id: NEXT_ID};
      const cars = [...state.cars, newCar];
      return {...state, cars};
    }
    case UPDATE:
      const filteredCars = state.cars.filter(car => car.id !== action.car.id);
      const cars = [...filteredCars, action.car];
      return {...state, cars};
    default:      
      return state;
  }
}

function extractFiltersFromQuery(query) {
  const listFilters = query.split(' ');
  return listFilters.slice(0, 2);
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