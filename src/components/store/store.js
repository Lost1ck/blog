import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import articlesReducer from './reducers/articlesReducers';
import { setOnlineStatus, setOfflineStatus } from './actions/actions';
import networkReducer from './actions/network';

const rootReducer = combineReducers({
  network: networkReducer,
  articles: articlesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

window.addEventListener('online', () => {
  store.dispatch(setOnlineStatus());
});

window.addEventListener('offline', () => {
  store.dispatch(setOfflineStatus());
});

export default store;
