import { createSlice } from '@reduxjs/toolkit';

type NotificationState = {
  notification: string;
};

const initialState: NotificationState = {
  notification: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      state.notification = action.payload;
    },
    hideNotification(state) {
      state.notification = '';
    },
  },
});

export const { displayNotification, hideNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
