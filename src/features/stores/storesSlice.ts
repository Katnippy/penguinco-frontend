import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IStore } from '../../common/types';
import storeService from '../../services/stores';

type StoresState = {
  loading: boolean,
  stores: [] | Array<IStore> | undefined,
  error: string,
}

const initialState: StoresState = {
  loading: false,
  stores: [],
  error: '',
};

export const getStores = createAsyncThunk('stores/getStores', async () => {
  return await storeService.readAllStores();
});

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStores.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStores.fulfilled, (state, action) => {
      state.loading = false;
      state.stores = action.payload ? action.payload : undefined;
    });
    builder.addCase(getStores.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error getting data.';
    });
  },
});

export default storesSlice.reducer;
