import initialStateCars, { manyCars } from '../fixtures/cars-fixture';
import {List, Map} from 'immutable';

export const LOAD   = 'LOAD';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';
export const FILTER = 'FILTER';

let NEXT_ID = null;

const initialState = {   
  cars: initialStateCars,
  filters: null,
  pagination: Map({
		page: 1,
		perPage: 5,
		total: 0,
		totalPages: 1,
    data: List.of([])
  })
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
      const pagination = getPaginatedItems(cars, state.pagination.page);
      return {...state, cars, pagination};
    }
    case CREATE: {      
      NEXT_ID = (state.cars && state.cars.length + 1) || 1;
      const newCar = {...action.car, id: NEXT_ID};      
      const cars = [...state.cars, newCar];      
      const pagination = getPaginatedItems(cars, state.pagination.page);
      return {...state, cars, pagination};
    }
    case UPDATE: {
      const originalIndex =  state.cars.findIndex(car => car.id === action.car.id);
      let carToUpdate = state.cars.find(car => car.id === action.car.id);
      const updatedCar = {...carToUpdate, ...action.car};
      state.cars[originalIndex] = updatedCar;
      return state;
    }
    default: {     
      const cars = state.cars || List.of([]);
      const pagination = getPaginatedItems(cars, state.pagination.page);
      console.log(pagination);
      return {...state, pagination};
    }
  }
}

/**
 * Function that paginates the items in 5 items per page.
 * returns an object with:
 * * page: the actual page;
 * * perPage: the number of items per page;
 * * total: total of the items;
 * * totalPages: the total number of the pages for all items
 * * data: An array with the items of the current page.
 */
export function getPaginatedItems(items, page = 1) {
  const perPage = 5;
  let offset = 0;
  let paginatedItems = List.of([]);
  let totalPages = 1;
  const itemsSize = items.count();
  if (items &&  itemsSize > 0 ) {
    totalPages = Math.ceil(itemsSize / perPage);
    console.log(totalPages);
    if (totalPages < page) {
      return getPaginatedItems(items, page -1);
    } else {
      offset = (page - 1) * perPage;
      paginatedItems = items.slice(offset, offset + perPage);
    }
  }  
	return Map({
    page: page,
		perPage: perPage,
    total: itemsSize,
		totalPages: totalPages,
		data: paginatedItems
  });
}

/**
* Function that applies filters in all items. 
* It pass forward the result of each filter to apply the next one.
* returns the an array of the accumulated items.
 */
function filterFunction(filters, items) {
  return filters.reduce((acc, filter) => {     
    let newItems = acc.filter(car => 
      car.combustivel.toLowerCase().includes(filter.toLowerCase()) 
        || car.marca.toLowerCase().includes(filter.toLowerCase())
    );
    return acc = newItems;
  }, items);
}

/**
 * Function that splits the search string typed by the user
 * to get the two first words
 * and returns an array with these words.
 */
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