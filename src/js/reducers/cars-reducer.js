import cars from '../utils/cars-fixture';

const LOAD   = 'LOAD';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE';
const FILTER = 'FILTER';

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

export function loadCars() {
  return { type: LOAD };
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