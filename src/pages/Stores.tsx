import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getStores } from '../features/stores/storesSlice';

export default function Stores() {
  const dispatch = useAppDispatch();
  const { loading, stores, error } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());
  }, []);

  return (
    <>
      <h1>PenguinCo Stores</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && error ? <h2>Error: {error}</h2> : ''}
      {!loading && stores.length ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Stock</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>
                  <ul>
                    {store.stock.map((item) => (
                      <li key={item.id}>
                        {item.name}: <i>{item.quantity} unit{item.quantity
                          !== 1 ? 's' : ''}</i>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <Link to={`/stores/${store.id}`}>
                    <button type="button">Manage</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : ''}
    </>
  );
}
