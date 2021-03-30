## Description

This project consist of 2 component:
* the root folder is [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository that contains the backend part.
* the `client` folder contains the react client app create using [Create React App](https://github.com/facebook/create-react-app)
## Installation

```bash
$ yarn install
$ cd client && yarn install
```

## Running the app

```bash
# to start both backend & frontend (separate ports)
$ yarn dev

## test the frontend part
$ cd client
$ yarn test
```


## React client App
The frontend part uses redux to manage the state of the react app, more precisely [redux-toolkit](https://github.com/reduxjs/redux-toolkit) is used to build the redux components

## Todo 
* Backend
  * Share the `.env` file in a more secure way instead of adding it to git 
  * Add testing to the api layer
  * Handle api errors more robustly
* Frontend
  * Store the `page` in query string instead of redux to make the page link show the same view when shared/revisted
  * Cache previosuly visited pages for faster navigation between pages
  * Add more tests to the data (reducers, middlewares) layer 
  * handle the websocket logic in a more predictable way using a library like [redux saga event channels](https://redux-saga.js.org/docs/advanced/Channels/#using-the-eventchannel-factory-to-connect-to-external-events)
