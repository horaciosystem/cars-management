# Cars Management
A _simple_ SPA for cars management.

## Demo
https://cars-management.herokuapp.com/

## Functionalities 
* CRUD operations;
* Filter by fuel and/or car's brand;
* Local pagination: App shows 5 cars per page;

## Installing
```
yarn install
or
npm install
```

## Running tests
yarn
```
yarn test
yarn test:watch
```
npm
```
npm test
npm run test:watch
```

## Development
Once the dependencies are installed, you can run:
```
yarn start:dev
or
npm run start:dev
```
You will then be able to access it at `localhost:3000`.

This project has automatic code reloading via **react-hot-loader**

## Production
First you need to run the task *build* for production:
```
yarn build
or
npm run build
```
and then you can start the production server
```
yarn start
or
npm start
```
It starts up a server at `localhost:5000`.

## Built with

### Build tool
  * webpack - https://webpack.js.org/

### Client
  * react - https://facebook.github.io/react/
  * redux - https://github.com/reactjs/redux
  * immutable - https://facebook.github.io/immutable-js/
  * react-modal - https://github.com/reactjs/react-modal
  * redux-form - http://redux-form.com/6.5.0/
  * bulma - http://bulma.io/

### Production server
  * express - http://expressjs.com/