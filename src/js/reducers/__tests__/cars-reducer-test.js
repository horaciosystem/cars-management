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

import initialState, { manyCars, pageOne } from '../../fixtures/cars-fixture';

describe('CarList reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  });

  //TODO pagination
  // it('should LOAD the first 5 cars', () => {
  //   const newState = reducer(manyCars, loadCars(1))
  //   expect(newState).toEqual(pageOne);
  //   const ids = newState.map(car => car.id);
  //   expect(ids).toEqual([1, 2, 3, 4, 5]);
  // });


  it('should handle CREATE', () => {
    const carToAdd = { 
      combustivel: 'Flex',
      imagem: null,
      marca: 'Fiat',
      modelo: 'Palio',
      placa: 'MFH-5577',
      valor: '23.500'
    };
    const expectedCar = { 
      id: 4,
      combustivel: 'Flex',
      imagem: null,
      marca: 'Fiat',
      modelo: 'Palio',
      placa: 'MFH-5577',
      valor: '23.500'
    };

    const newState = reducer(initialState, createCar(carToAdd));
    expect(newState).toEqual([...initialState, expectedCar]);
    expect(newState.pop()).toEqual(expectedCar);
  });

  it('should handle UPDATE', () => {
    const car = {
      id: 2,
      combustivel: 'Gasolina',
      imagem: null,
      marca: 'Volkswagem',
      modelo: 'Fox',
      placa: 'FOX-4125',
      valor: '17.650'
    };
    
    expect(
        reducer(initialState, updateCar(car))
          .find(car => car.id === 2)
    ).toEqual(car);
  });

  it('should handle REMOVE', () => {
    
    expect(
        reducer(initialState, removeCar(3))
          .some(car => car.id === 3)
    ).toBe(false);
  });


});


describe('CarList actions reducer', () => {

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
    const id =  888;
    
    const expectedAction = {
      type: REMOVE,
      id: id
    }
    expect(removeCar(id)).toEqual(expectedAction);
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

