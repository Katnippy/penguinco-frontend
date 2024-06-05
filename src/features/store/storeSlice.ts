import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';

import { IStore } from '../../common/types';
import storeService from '../../services/stores';

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

// ? Inconsistent terminology (i.e. get = HTTP, but update = CRUD)?
export const getStore =
  createAsyncThunk('store/getStore', async (id: number) => {
    return await storeService.readById(id);
  });

export const updateStore =
  createAsyncThunk('store/updateStore', async (storeToUpdate: IStore) => {
    return await storeService.update(storeToUpdate.id, storeToUpdate);
  });

export const resetState = createAction('resetState');

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStore.fulfilled, (state, action) => {
        state.loading = false;
        state.store = action.payload;
      })
      .addCase(getStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error getting data.';
      })
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStore.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error updating data.';
      })
      .addCase(resetState, () => initialState);
  },
});

export default storesSlice.reducer;
