import initialStateCars, { manyCars } from '../fixtures/cars-fixture';
import rest from 'lodash/fp/rest';
export const LOAD   = 'LOAD';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';
export const FILTER = 'FILTER';

let NEXT_ID = null;

export function getPaginatedItems(items, page = 1) {
  const per_page = 5;
  let offset = 0;
  let paginatedItems = [];
  if (items && items.length > 0 ) {
    offset = (page - 1) * per_page;
    paginatedItems = items.slice(offset, offset + per_page);
  }
      
	return {
		page: page,
		perPage: per_page,
		total: items.length,
		totalPages: Math.ceil(items.length / per_page),
		data: paginatedItems
	};
}

const initialState = {    
  cars: initialStateCars,
  filters: null,
  pagination: {
		page: 1,
		perPage: 5,
		total: 0,
		totalPages: 1,
		data: []
  }
}

function filterFunction(filters, items) {
  return filters.reduce((acc, filter) => {     
    let newItems = acc.filter(car => 
      car.combustivel.toLowerCase().includes(filter.toLowerCase()) 
        || car.marca.toLowerCase().includes(filter.toLowerCase())
    );
    return acc = newItems;
  }, items);
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {    
    case FILTER: {      
      const filters = extractFiltersFromQuery(action.query);         
      const filteredCars = filterFunction(filters, state.cars);
      const pagination = getPaginatedItems(filteredCars, action.page);
      return {...state, pagination, filters};
    }
    case LOAD:
      let filteredCars = state.cars;
      const filters = state.filters;
      if (filters) {
        filteredCars = filterFunction(filters, state.cars);
      }
      const pagination = getPaginatedItems(filteredCars, action.page);
      return {...state, pagination};      
    case REMOVE: {
      const cars = state.cars.filter(car => car.id !== action.id);
      const pagination = getPaginatedItems(cars);      
      return {...state, cars, pagination};
    }
    case CREATE: {      
      NEXT_ID = state.cars && state.cars.length + 1;
      const newCar = {...action.car, id: NEXT_ID};      
      const cars = [...state.cars, newCar];      
      const pagination = getPaginatedItems(cars, action.page);
      return {...state, cars, pagination};
    }
    case UPDATE: {
      const originalIndex =  state.cars.findIndex(car => car.id === action.car.id);
      let carToUpdate = state.cars.find(car => car.id === action.car.id);
      const updatedCar = {...carToUpdate, ...action.car};
      state.cars[originalIndex] = updatedCar;      
      const pagination = getPaginatedItems(state.cars);
      return {...state, pagination};
    }
    default: {     
      const cars = state.cars || [];
      const pagination = getPaginatedItems(cars, state.pagination.page);
      return {...state, pagination};
    }
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

export function createCar(car, page) {
  return { type: CREATE, car, page };
}

export function updateCar(car) {
  return { type: UPDATE, car };
}

export function removeCar(id) {
  return { type: REMOVE, id };
}