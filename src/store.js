import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { session } from 'store2';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);
const enhancer = process.env.NODE_ENV === 'production' ? middleware : composeEnhancers(middleware);
/* eslint-enable */

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

const isProp = process.env.NODE_ENV === 'production';
const store = configureStore(isProp ? session.get('state', {}) : undefined);

if (isProp) {
  store.subscribe(() => {
    session.set('state', store.getState());
  });
}

export default store;
