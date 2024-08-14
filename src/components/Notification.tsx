import { useEffect } from 'react';

import { Alert } from '@mui/material';

// !
// import { useAppDispatch, useAppSelector } from '../app/hooks';
// import { hideNotification } from '../features/notification/notificationSlice';
// !

export default function Notification() {
  // !
  // const dispatch = useAppDispatch();
  // const { notification } = useAppSelector((state) => state.notification);
  // !

  // ! Temporarily changed to make designing UI easier!
  const notification = 'Test error.';
  // !

  useEffect(() => {
    // !
    // setTimeout(() => {
    //   dispatch(hideNotification());
    // }, 5000);
    // !
  }, [notification]);

  if (notification) {
    return (
      <Alert id='notification' variant="filled" severity="error"
        // TODO: Make this solution for the notification going off-screen on
        // TODO: mobile less hacky.
        sx={{ width: { xs: '83.5vw', md: 'auto' }, mb: 2 }}>
        {notification}
      </Alert>
    );
  } else {
    return '';
  }
}
