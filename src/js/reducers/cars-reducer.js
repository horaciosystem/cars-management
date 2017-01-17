import cars from '../utils/cars-fixture';

export const LOAD   = 'LOAD';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';
export const FILTER = 'FILTER';

export default function reducer(state = cars, action = {}) {
  switch (action.type) {
    case FILTER:      
      return state;
    case LOAD:      
      return state;
    case REMOVE:
      return state;
    case CREATE:
      return state;      
    case UPDATE:
      return state;
    default:      
      return state
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

export function removeCar(car) {
  return { type: REMOVE, car };
}