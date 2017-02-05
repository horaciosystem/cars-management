import initialStateCars, { manyCars } from '../fixtures/cars-fixture';
import Immutable,{List, Map} from 'immutable';

export const LOAD   = 'LOAD';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';
export const FILTER = 'FILTER';

let NEXT_ID = null;

const initialState = Map({
  cars: initialStateCars,
  filters: List(),
  pagination: Map({
		page: 1,
		perPage: 5,
		total: 0,
		totalPages: 1,
    data: List()
  })
})

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {    
    case FILTER: {      
      const filterQuery = action.query;
      const filters = extractFiltersFromQuery(filterQuery);
      const filteredCars = filterFunction(filters, state.get('cars'));
      const pagination = getPaginatedItems(filteredCars, action.page);
      return state.merge(Map({ pagination, filters}));
    }
    case LOAD:
      let filteredCars = state.get('cars');
      const filters = state.get('filters');
      if (filters.length > 0) {
        filteredCars = filterFunction(filters, filteredCars);
      }
      const pagination = getPaginatedItems(filteredCars, action.page);      
      return state.mergeIn(['pagination'], pagination);
    case REMOVE: {
      const index = state.get('cars').findIndex(item => item.get('id') === action.id);

      if (index >= 0) {
        const cars = state.get('cars').delete(index);
        const pagination = getPaginatedItems(cars, state.getIn(['pagination', 'page']));
        return state.merge(Map({cars, pagination}));
      } else { 
        return state
      }
    }
    case CREATE: {
      NEXT_ID = (state.get('cars') && state.get('cars').count() + 1) || 1;
      const newCar = {...action.car, id: NEXT_ID};
      const cars = state.get('cars').push(Map(newCar));
      const actualPage = state.getIn(['pagination', 'page']);
      const pagination = getPaginatedItems(cars, actualPage);
      return state.merge(Map({ pagination, cars }));
    }
    case UPDATE: {
      const index = state.get('cars').findIndex(item => item.get('id') === action.car.id);
      if (index >= 0) {
        const cars = state.get('cars').update(index, (item) => item.merge(action.car));
        const actualPage = state.getIn(['pagination', 'page']);
        const pagination = getPaginatedItems(cars, actualPage);      
        return state.merge(Map({ pagination, cars }));
      } else {
        return state;
      }
    }
    default: {     
      const cars = state.get('cars') || List.of([]);
      const pagination = getPaginatedItems(cars, state.get('pagination').get('page'));
      return state.mergeIn(['pagination'], pagination);
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
  const itemsSize = items ? items.count() : 0;
  if (items &&  itemsSize > 0 ) {
    totalPages = Math.ceil(itemsSize / perPage);
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
* It pass forward the result of each filter to apply to the next one.
* returns an array of the accumulated items.
 */
function filterFunction(filters, items) {
  return filters.reduce((acc, filtro) => {
    return acc.filter(car => 
      car.get('combustivel').toLowerCase().includes(filtro.toLowerCase()) 
        || car.get('marca').toLowerCase().includes(filtro.toLowerCase())
    );
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