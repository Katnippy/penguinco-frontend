import { configureStore } from '@reduxjs/toolkit';

import storesReducer from '../features/stores/storesSlice';
import storeReducer from '../features/store/storeSlice';

export const store = configureStore({
  reducer: {
    stores: storesReducer,
    store: storeReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
