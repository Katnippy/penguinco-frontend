import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';

import Stores from './pages/Stores';
import Store from './pages/Store';
import { store } from './app/store';

const router = createBrowserRouter([
  {
    path: '/stores',
    element: <Stores />
  },
  {
    path: '/stores/:id',
    element: <Store />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
