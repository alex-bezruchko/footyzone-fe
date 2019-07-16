import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Authenticate from "./components/authenticate/Authenticate";
import "./index.css";
import { Provider } from "react-redux";
import usersReducer from "./reducers/usersReducer.js";
import postsReducer from "./reducers/postsReducer.js";
import newsReducer from "./reducers/newsReducer.js";

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import "bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from "./serviceWorker";

const blogStore = createStore(
  combineReducers({
    postsReducer,
    usersReducer,
    newsReducer,
  }),
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <Provider store={blogStore}>
    <Router>
      <Authenticate />
    </Router>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
