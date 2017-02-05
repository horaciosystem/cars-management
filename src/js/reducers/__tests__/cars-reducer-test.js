import reducer, {  
  loadCars,
  filterCars,
  createCar,
  updateCar,
  removeCar,
  getPaginatedItems
} from '../cars-reducer';

import {
  LOAD,
  CREATE,
  UPDATE,
  REMOVE,
  FILTER
} from '../cars-reducer';

import Immutable, {List, Map} from 'immutable';
import initialCarsState, { manyCars, pageOne } from '../../fixtures/cars-fixture';

const initialState = Map({    
  cars: initialCarsState,
  filters: List(),
  pagination: Map({
		page: 1,
		perPage: 5,
		total: 3,
		totalPages: 1,
		data: initialCarsState
  })
});

const MANY_CARS = Map({
  filters: List(),
  cars: manyCars,
  pagination: Map({
		page: 1,
		perPage: 5,
		total: 16,
		totalPages: 4,
		data: List(manyCars.slice(0, 5))
  })
});

describe('CarList reducer', () => {
  it('should return the initial state', () => {
    const newState = reducer(undefined, {});    
    expect(newState.get('cars')).toEqual(initialState.get('cars'));
    expect(newState.get('filters')).toEqual(initialState.get('filters'));
    expect(newState.get('pagination')).toEqual(initialState.get('pagination'));
  });

  it('should return initial page 1 when handle DEFAULT with initial state', () => {
    let stateOne = reducer(initialState, {});
    expect(stateOne).toEqual(initialState);
    expect(stateOne.getIn(['pagination','page'])).toEqual(1);
  })

  it('should return the current page when handle DEFAULT', () => {
    const pagination = Map({
      page: 3,
      perPage: 5,
      total: 15,
      totalPages: 4,
      data: []
    });
    const mergedState = MANY_CARS.mergeIn(['pagination'], pagination);
    let newState = reducer(mergedState, {});
    expect(newState.getIn(['pagination','page'])).toEqual(3);
  });

  it('should handle LOAD', () => {
    const newState = reducer(initialState, loadCars());
    expect(newState).toEqual(initialState);
  });

  it('should handle LOAD with pagination', () => {
    const newState = reducer(MANY_CARS, loadCars());
    expect(newState.getIn(['pagination','data']).count()).toEqual(5);
    expect(newState.get('pagination').toJS())
      .toEqual(
      {
        page: 1,
        perPage: 5,
        total: 16,
        totalPages: 4,
        data: pageOne.toJS()
	    }
    );    
  });

  it('should handle LOAD with pagination - page 2', () => {
    const newState = reducer(MANY_CARS, loadCars(2));
    expect(newState.getIn(['pagination','data']).count()).toEqual(5);
    const paginatedItems = newState.getIn(['pagination','data']);    
    expect(paginatedItems.toJS()[0].id).toEqual(6);    
    expect(paginatedItems.toJS()[4].id).toEqual(10);    
  });

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
    const cars = initialState.get('cars').push(expectedCar);
    const mergedState = initialState.mergeIn(['cars'], cars);
    expect(newState.get('cars').toJS()).toEqual(mergedState.get('cars').toJS());    
    expect(newState.get('cars').find(item => item.get('id') === 4).toJS()).toEqual(expectedCar);
  });

  it('should CREATE a car with ID incresed by the last', () => {
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

    const newState = reducer(MANY_CARS, createCar(carToAdd));    
    const lastCar = newState.get('cars').toJS().pop();
    expect(lastCar.id).toEqual(17);
  });

  it('should handle CREATE and return the pagination', () => {
    const carToAdd = { 
      combustivel: 'Flex',
      imagem: null,
      marca: 'Fiat',
      modelo: 'Palio',
      placa: 'MFH-5577',
      valor: '23.500'
    };
    const newStateOne = reducer(initialState, createCar(carToAdd));
    const newStateTwo = reducer(newStateOne, createCar(carToAdd));
    const newStateThree = reducer(newStateTwo, createCar(carToAdd));
    
    expect(newStateThree.getIn(['pagination','data']).count()).toEqual(5);    
    expect(newStateThree.getIn(['pagination','total'])).toEqual(6);
    expect(newStateThree.getIn(['pagination','totalPages'])).toEqual(2);
  });

  it('should return the same page after CREATE', () => {
    const car = {
      id: 12,
      combustivel: 'Nuclear',
      imagem: null,
      marca: 'Delorean',
      modelo: 'DMC-12',
      placa: 'OCT-2015',
      valor: '28.000'
    };

    const pagination = Map({
      page: 3,
      perPage: 5,
      total: 16,
      totalPages: 4,
      data: manyCars
    });
    const mergedState = MANY_CARS.mergeIn(['pagination'], pagination);

    const newState = reducer(mergedState, createCar(car));
    expect(newState.getIn(['pagination','page'])).toEqual(3);
    expect(newState.getIn(['pagination','total'])).toEqual(17);
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
    const newState = reducer(initialState, updateCar(car));
    expect(
        newState.get('cars').toJS().find(car => car.id === 2)
    ).toEqual(car);
  });

  it('should keep the UPDATED car in the same state position', () => {
    const car = {
      id: 2,
      combustivel: 'Gasolina',      
      valor: '15.000'
    };
    
    const originalIndex = MANY_CARS.getIn(['pagination','data']).findIndex(car => car.get('id') === 2);
    const newState = reducer(MANY_CARS, updateCar(car));
    expect(newState.getIn(['pagination','data']).find(car => car.get('id') === 2).get('valor')).toEqual('15.000');
    expect(newState.getIn(['pagination','data']).toJS().findIndex(car => car.id === 2)).toEqual(originalIndex);
  });

  it('should return the same page after UPDATE', () => {
    const car = {
      id: 12,
      combustivel: 'Nuclear',
      imagem: null,
      marca: 'Delorean',
      modelo: 'DMC-12',
      placa: 'OCT-2015',
      valor: '28.000'
    };
    const pagination = Map({
      page: 3,
      perPage: 5,
      total: 15,
      totalPages: 4,
      data: manyCars
    });
    const mergedState = MANY_CARS.mergeIn(['pagination'], pagination);
    const newState = reducer(mergedState, updateCar(car));
    expect(newState.getIn(['pagination', 'page'])).toEqual(3);
  });

  it('should not change the state when UPDATE an inexistent car', () => {
    expect(
        reducer(initialState, updateCar({id: 765765})).toJS()
    ).toEqual(initialState.toJS());
  });

  it('should handle REMOVE', () => {
    expect(
        reducer(initialState, removeCar(3)).get('cars').toJS()
          .some(car => car.id === 3)
    ).toBe(false);
  });

  it('should handle REMOVE', () => {
    const newState = reducer(MANY_CARS, removeCar(3));        
    expect(newState.getIn(['pagination','data']).count()).toEqual(5);    
    expect(newState.getIn(['pagination','total'])).toEqual(15);
    expect(newState.getIn(['pagination','totalPages'])).toEqual(3);
  });

  it('should return the same page after REMOVE', () => {
    const pagination = Map({
      page: 2,
      perPage: 5,
      total: 15,
      totalPages: 4,
      data: manyCars
    });
    const mergedState = MANY_CARS.mergeIn(['pagination'], pagination);
    const newState = reducer(mergedState, removeCar(7));
    expect(newState.getIn(['pagination', 'page'])).toEqual(2);
  });

  it('should not change the state when REMOVE an inexistent car', () => {
    expect(
        reducer(initialState, removeCar(14234)).toJS()          
    ).toEqual(initialState.toJS());
  });

  it('should return the previous page when REMOVE the last car of the page', () => {
    const pagination = Map({
      page: 4,
      perPage: 5,
      total: 15,
      totalPages: 4,
      data: manyCars
    });
    const mergedState = MANY_CARS.mergeIn(['pagination'], pagination);
    const newState = reducer(mergedState, removeCar(16));

    expect(newState.getIn(['pagination', 'page'])).toEqual(3);
    expect(newState.getIn(['pagination', 'totalPages'])).toEqual(3);
  });

  it('should FILTER cars by fuel', () => {
    const query = 'flex';
    const newState = reducer(MANY_CARS, filterCars(query));    
    expect(newState.getIn(['pagination','data']).count()).toEqual(5);
  });

  it('should FILTER cars by fuel partial description', () => {
    const query = 'fl';
    const newState = reducer(MANY_CARS, filterCars(query));    
    expect(
      newState.getIn(['pagination','data']).count()
    ).toEqual(5)
  });

  it('should FILTER cars by brand Volkswagem', () => {
    const query = 'volkswagem';
    const newState = reducer(MANY_CARS, filterCars(query));    
    expect(
      newState.getIn(['pagination','data']).count()
    ).toEqual(4)
  });

  it('should FILTER cars by brand Volkswagen', () => {
    const query = 'volkswagen';
    const newState = reducer(MANY_CARS, filterCars(query));
    expect(
      newState.getIn(['pagination','data']).count()
    ).toEqual(5)
  });

  it('should FILTER cars by brand partial description', () => {
    const query = 'volks';
    const newState = reducer(MANY_CARS, filterCars(query));    
    expect(
      newState.getIn(['pagination','total'])
    ).toEqual(9)
  });

  it('should FILTER cars by fuel and brand', () => {
    const query = 'flex volkswagem';
    const newState = reducer(MANY_CARS, filterCars(query));
    expect(    
      newState.getIn(['pagination','data']).count()
    ).toEqual(1)
  });

  it('should FILTER cars by brand and fuel', () => {
    const query = 'volkswagem flex';
    const newState = reducer(MANY_CARS, filterCars(query));
    expect(
      newState.getIn(['pagination','data']).count()
    ).toEqual(1)
  });
  

  it('should FILTER cars by fuel partial decription and brand', () => {
    const query = 'gas volkswagem';
    const newState = reducer(MANY_CARS, filterCars(query));
    expect(
      newState.getIn(['pagination','data']).count()
    ).toEqual(2)
  });

  it('should FILTER cars by fuel and brand partial description', () => {
    const query = 'gasolina volks';
    const newState = reducer(MANY_CARS, filterCars(query));    
    expect(
      newState.getIn(['pagination','data']).count()
    ).toEqual(3)
  });

  it('should return the same state when FILTER with an empty query', () => {
    const query = '';
    const newState = reducer(MANY_CARS, filterCars(query));    
    expect(newState.get('cars')).toEqual(MANY_CARS.get('cars'));
    expect(newState.get('pagination')).toEqual(MANY_CARS.get('pagination'));
  });


});

describe('Pagination function', () => {
  it('should return the first 5 items', () => {
    const pagination = getPaginatedItems(manyCars);
    expect(
      pagination.get('data').count()
    ).toEqual(5);
  });

  it('should return from item 5 to 10', () => {
    const pagination = getPaginatedItems(manyCars, 2)
    expect(
      pagination
    ).toEqual(Map({
      page: 2,
      perPage: 5,
      total: 16,
      totalPages: 4,
      data: manyCars.slice(5, 10)
    }))    
    expect(pagination.get('data').count()).toEqual(5);
    expect(pagination.get('data').toJS()[0].id).toEqual(6);
  });

  it('should return from item 10 to 5', () => {
    const pagination = getPaginatedItems(manyCars, 3)
    expect(
      pagination
    ).toEqual(Map({
      page: 3,
      perPage: 5,
      total: 16,
      totalPages: 4,
      data: manyCars.slice(10, 15)
    }))
    expect(pagination.get('data').toJS()[0].id).toEqual(11);    
  });

  it('should return only the item ID 16', () => {
    const pagination = getPaginatedItems(manyCars, 4)
    expect(
      pagination
    ).toEqual(Map({
      page: 4,
      perPage: 5,
      total: 16,
      totalPages: 4,
      data: manyCars.slice(15, manyCars.length)
    }));
    expect(pagination.get('data').toJS()[0].id).toEqual(16);    
  });

  it('should return the next page with items', () => {
    const newState = manyCars.pop();
    const pagination = getPaginatedItems(newState, 4);
    expect(pagination.get('page')).toEqual(3);

    
    expect(pagination.get('data').last().get('id')).toEqual(15);
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

