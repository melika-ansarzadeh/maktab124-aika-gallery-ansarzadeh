import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './reducers/cartReducer';

const combinedReducers = combineReducers({
  cart: cartReducer,
});

const persistedReducers = persistReducer(
  {
    key: 'aika-gallery',
    storage,
    whitelist: ['cart'],
  },
  combinedReducers
);

const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefault =>
    getDefault({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;