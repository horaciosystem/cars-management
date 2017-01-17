import reducer, {  
  loadCars,
  filterCars,
  createCar,
  updateCar,
  removeCar
} from '../cars-reducer';

import {
  LOAD,
  CREATE,
  UPDATE,
  REMOVE,
  FILTER
} from '../cars-reducer';

import cars from '../../utils/cars-fixture';

describe('LOAD reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(cars)
  });


});


describe('Actions reducer', () => {

  it('should return an action type LOAD', () => {
    const page = 1;
    const expectedAction = {
      type: LOAD,
      page: page
    }
    expect(loadCars(page)).toEqual(expectedAction);
  });

  it('should return an action type CREATE', () => {    
    const car = {id: 123};
    
    const expectedAction = {
      type: CREATE,
      car: car
    }
    expect(createCar(car)).toEqual(expectedAction);
  });

  it('should return an action type UPDATE', () => {    
    const car = {id: 777};
    
    const expectedAction = {
      type: UPDATE,
      car: car
    }
    expect(updateCar(car)).toEqual(expectedAction);
  });

  it('should return an action type REMOVE', () => {    
    const car = {id: 888};
    
    const expectedAction = {
      type: REMOVE,
      car: car
    }
    expect(removeCar(car)).toEqual(expectedAction);
  });

  it('should return an action type FILTER', () => {    
    const query = {combustivel: '', marca: ''};
    
    const expectedAction = {
      type: FILTER,
      query: query
    }
    expect(filterCars(query)).toEqual(expectedAction);
  });

});

