import {initialStateCars, manyCars } from '../fixtures/cars-fixture';
import rest from 'lodash/fp/rest';
export const LOAD   = 'LOAD';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';
export const FILTER = 'FILTER';

let NEXT_ID = 3;

export function getPaginatedItems(items, page = 1) {
	const per_page = 5;
	const offset = (page - 1) * per_page;
	const paginatedItems = items.slice(offset, offset + per_page);
      
	return {
		page: page,
		perPage: per_page,
		total: items.length,
		totalPages: Math.ceil(items.length / per_page),
		data: paginatedItems
	};
}

const initialState = {    
  cars: manyCars
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
      NEXT_ID = NEXT_ID + 1;
      const newCar = {...action.car, id: NEXT_ID};
      console.log('car', newCar)
      const cars = [...state.cars, newCar];
      const pagination = getPaginatedItems(cars);
      return {...state, cars, pagination};
    }
    case UPDATE: {
      const filteredCars = state.cars.filter(car => car.id !== action.car.id);
      const cars = [...filteredCars, action.car];
      return {...state, cars};
    }
    default: {     
      const pagination = getPaginatedItems(state.cars);
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

export function createCar(car) {
  return { type: CREATE, car };
}

export function updateCar(car) {
  return { type: UPDATE, car };
}

export function removeCar(id) {
  return { type: REMOVE, id };
}