import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
// import reduxImmutableStateInvariant from 'reduxImmutableStateInvariant';


const middleware = [thunk];

const finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )(createStore);

export default finalCreateStore(rootReducer);

// export default function configureStore(initialState) {
//   return createStore(
//     rootReducer,
//     initialState
//     // applyMiddleware(reduxImmutableStateInvariant())
//   );
// }
