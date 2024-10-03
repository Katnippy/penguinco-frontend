import { configureStore } from '@reduxjs/toolkit';

import storesReducer from '../features/stores/storesSlice';
import storeReducer from '../features/store/storeSlice';
import notificationReducer from '../features/notification/notificationSlice';

export const store = configureStore({
  reducer: {
    stores: storesReducer,
    store: storeReducer,
    notification: notificationReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
