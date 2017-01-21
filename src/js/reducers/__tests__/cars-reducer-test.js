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

import initialCarsState, { manyCars, pageOne } from '../../fixtures/cars-fixture';

const initialState = {    
  cars: initialCarsState,
  filters: null,
  pagination: {
		page: 1,
		perPage: 5,
		total: 3,
		totalPages: 1,
		data: initialCarsState
  }
}

const MANY_CARS = {
  filters: null,
  cars: manyCars,
  pagination: {
		page: 1,
		perPage: 5,
		total: 15,
		totalPages: 4,
		data: manyCars
	}
}

describe('CarList reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  });

  it('should return initial page 1 when handle DEFAULT with initial state', () => {
    let stateOne = reducer(initialState, {});
    expect(stateOne).toEqual(initialState);
    expect(stateOne.pagination.page).toEqual(1);
  })

  it('should return the current page when handle DEFAULT', () => {
    

    let stateTwo = reducer({...MANY_CARS, pagination: {
        page: 3,
        perPage: 5,
        total: 15,
        totalPages: 4,
        data: initialCarsState
      }}, {});
    expect(stateTwo.pagination.page).toEqual(3);
  });

  it('should handle LOAD', () => {
    const newState = reducer(initialState, loadCars());
    expect(newState).toEqual(initialState);    
  });

  it('should handle LOAD with pagination', () => {
    const newState = reducer(MANY_CARS, loadCars());
    expect(newState.pagination.data.length).toEqual(5);    
    expect(newState.pagination)
      .toEqual(
      {
        page: 1,
        perPage: 5,
        total: 16,
        totalPages: 4,
        data: pageOne
	    }
    );    
  });

  it('should handle LOAD with pagination - page 2', () => {
    const newState = reducer(MANY_CARS, loadCars(2));
    expect(newState.pagination.data.length).toEqual(5);    
    const paginatedItems = newState.pagination.data;
    expect(paginatedItems[0].id).toEqual(6);    
    expect(paginatedItems[4].id).toEqual(10);    
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
    expect(newState.pagination.data).toEqual([...initialState.pagination.data, expectedCar]);
    expect(newState.cars.pop()).toEqual(expectedCar);
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
    const lastCar = newState.cars.pop();
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
    
    expect(newStateThree.pagination.data.length).toEqual(5);    
    expect(newStateThree.pagination.total).toEqual(6);
    expect(newStateThree.pagination.totalPages).toEqual(2);
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
        reducer(initialState, updateCar(car)).cars
          .find(car => car.id === 2)
    ).toEqual(car);
  });

  it('should keep the updated car in the same state position', () => {
    const car = {
      id: 2,
      combustivel: 'Gasolina',      
      valor: '15.000'
    };
    
    const originalIndex = MANY_CARS.pagination.data.findIndex(car => car.id === 2);    
    const newState = reducer(MANY_CARS, updateCar(car));
    expect(newState.pagination.data.find(car => car.id === 2).valor).toEqual('15.000');
    expect(newState.pagination.data.findIndex(car => car.id === 2)).toEqual(originalIndex);
  });

  it('should handle REMOVE', () => {
    expect(
        reducer(initialState, removeCar(3)).cars
          .some(car => car.id === 3)
    ).toBe(false);
  });

  it('should handle REMOVE', () => {
    const newState = reducer(MANY_CARS, removeCar(3));        
    expect(newState.pagination.data.length).toEqual(5);    
    expect(newState.pagination.total).toEqual(15);
    expect(newState.pagination.totalPages).toEqual(3);
  });

  it('should not change the state when REMOVE an inexistent car', () => {
    expect(
        reducer(initialState, removeCar(14234))          
    ).toEqual(initialState);
  });

  it('should FILTER cars by fuel', () => {
    const query = 'flex';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {cars, pagination} = newState;
    expect(pagination.data.length).toEqual(5);
  });

  it('should FILTER cars by fuel partial description', () => {
    const query = 'fl';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {pagination, cars} = newState;
    expect(
      pagination.data.length
    ).toEqual(5)
  });

  it('should FILTER cars by brand Volkswagem', () => {
    const query = 'volkswagem';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {pagination, cars} = newState;
    expect(
      pagination.data.length
    ).toEqual(4)
  });

  it('should FILTER cars by brand Volkswagen', () => {
    const query = 'volkswagen';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {pagination, cars} = newState;
    expect(
      pagination.data.length
    ).toEqual(5)
  });

  it('should FILTER cars by brand partial description', () => {
    const query = 'volks';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {pagination, cars} = newState;
    expect(
      pagination.total
    ).toEqual(9)
  });

  it('should FILTER cars by fuel and brand', () => {
    const query = 'flex volkswagem';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {pagination, cars} = newState;
    expect(
      pagination.data.length
    ).toEqual(1)
  });

  it('should FILTER cars by brand and fuel', () => {
    const query = 'volkswagem flex';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {pagination, cars} = newState;
    expect(
      pagination.data.length
    ).toEqual(1)
  });
  

  it('should FILTER cars by fuel partial decription and brand', () => {
    const query = 'gas volkswagem';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {pagination, cars} = newState;
    expect(
      pagination.data.length
    ).toEqual(2)
  });

  it('should FILTER cars by fuel and brand partial description', () => {
    const query = 'gasolina volks';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {pagination, cars} = newState;
    expect(
      pagination.data.length
    ).toEqual(3)
  });

  it('should return the same state when FILTER with an empty query', () => {
    const query = '';
    const newState = reducer(MANY_CARS, filterCars(query));
    const {filters, cars} = newState;
    expect(cars).toEqual(MANY_CARS.cars);
    expect(filters).toEqual(['']);
  });


});

describe('Pagination function', () => {
  it('should return the first 5 items', () => {
    expect(
      getPaginatedItems(manyCars).data.length
    ).toEqual(5);
  });

  it('should return from item 5 to 10', () => {
    const result = getPaginatedItems(manyCars, 2)
    expect(
      result
    ).toEqual({
      page: 2,
      perPage: 5,
      total: 16,
      totalPages: 4,
      data: manyCars.slice(5, 10)
    })    
    expect(result.data.length).toEqual(5);
    expect(result.data[0].id).toEqual(6);
  });

  it('should return from item 10 to 5', () => {
    const result = getPaginatedItems(manyCars, 3)
    expect(
      result
    ).toEqual({
      page: 3,
      perPage: 5,
      total: 16,
      totalPages: 4,
      data: manyCars.slice(10, 15)
    })
    expect(result.data[0].id).toEqual(11);    
  });

  it('should return only the item ID 16', () => {
    const result = getPaginatedItems(manyCars, 4)
    expect(
      result
    ).toEqual({
      page: 4,
      perPage: 5,
      total: 16,
      totalPages: 4,
      data: manyCars.slice(15, manyCars.length)
    })
    expect(result.data[0].id).toEqual(16);    
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

