import { useEffect } from 'react';

import { Alert } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { hideNotification } from '../features/notification/notificationSlice';

export default function Notification() {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.notification);

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  }, [notification]);

  if (notification) {
    return <Alert variant="filled" severity="error">{notification}</Alert>;
  } else {
    return '';
  }
}
