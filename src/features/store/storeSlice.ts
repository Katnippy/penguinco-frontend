import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IStore } from '../../../common/types';
import storeService from '../../../services/stores';

type StoreState = {
  loading: boolean,
  store: IStore,
  error: string,
}

const initialState: StoreState = {
  loading: false,
  store: {}, // ! Needs to be a nullable type.
  error: '',
};

export const getStore =
  createAsyncThunk('store/getStore', async (id: string) => {
    return await storeService.readById(id);
  });

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStore.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStore.fulfilled, (state, action) => {
      state.loading = false;
      state.store = action.payload;
    });
    builder.addCase(getStore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error getting data.';
    });
  },
});

export default storesSlice.reducer;
