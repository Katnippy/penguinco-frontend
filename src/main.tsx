import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Stores from './pages/Stores';
import Store from './pages/Store';
import NotFound from './pages/NotFound';
import { store } from './app/store';
import { injectStore } from './services/crud';

injectStore(store);

const router = createBrowserRouter([
  {
    path: '/stores',
    element: <Stores />,
  },
  {
    path: '/stores/:id',
    element: <Store />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
