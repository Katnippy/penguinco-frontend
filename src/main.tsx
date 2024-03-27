import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import Stores from './pages/Stores';
import Store from './pages/Store';

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
    <RouterProvider router={router} />
  </React.StrictMode>,
);
