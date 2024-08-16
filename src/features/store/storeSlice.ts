import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';

import { IStore } from '../../common/types';
import storeService from '../../services/stores';

type StoreState = {
  loading: boolean,
  store: Record<string, never> | IStore | undefined,
  error: string,
}

const initialState: StoreState = {
  loading: false,
  store: {}, // ? Fill in IStore properties?
  error: '',
};

// ? Inconsistent terminology (i.e. get = HTTP, but update = CRUD)?
export const getStore =
  createAsyncThunk('store/getStore', async (id: number) => {
    return await storeService.readStoreById(id);
  });

export const updateStore =
  createAsyncThunk('store/updateStore', async (storeToUpdate: IStore) => {
    return await storeService.updateStore(+storeToUpdate.id, storeToUpdate);
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
        state.store = action.payload ? action.payload : undefined;
      })
      .addCase(getStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error reading data.';
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
