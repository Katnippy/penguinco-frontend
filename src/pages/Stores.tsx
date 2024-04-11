import { useEffect, useState, ChangeEvent } from 'react';

import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getStores } from '../features/stores/storesSlice';
import { IStore } from '../common/types';

export default function Stores() {
  const dispatch = useAppDispatch();
  const { loading, stores, error } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());
  }, []);

  const [shownStores, setShownStores] = useState<Array<IStore>>(stores);

  useEffect(() => {
    setShownStores(stores);
  }, [stores]);

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value !== '') {
      setShownStores(stores.filter((store) =>
        store.name.toLowerCase().includes(event.target.value.toLowerCase())));
    } else {
      setShownStores(stores);
    }
  }

  return (
    <>
      <h1>PenguinCo Stores</h1>
      <h2>Filter stores by name</h2>
      <input id="filter" onChange={handleFilterChange} />
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
            {shownStores.map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>
                  <ul>
                    {store.stock.length ? store.stock.map((item) => (
                      <li key={item.id}>
                        {item.name}: <i>{item.quantity} unit{item.quantity
                          !== 1 ? 's' : ''}</i>
                      </li>
                    )) : 'No stock...'}
                  </ul>
                </td>
                <td>
                  <Link to={`/stores/${store.id.toString()}`}>
                    <button>Manage</button>
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
