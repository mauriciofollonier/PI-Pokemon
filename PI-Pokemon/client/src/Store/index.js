import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../Reducers/rootReducer.js";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  
export default store;