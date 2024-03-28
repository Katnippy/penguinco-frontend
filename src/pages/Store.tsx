import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getStore, updateStore } from '../features/store/storeSlice';
import { IStore } from '../../common/types';

export default function Store() {
  const params = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { loading, store, error } = useAppSelector((state) => state.store);

  useEffect(() => {
    dispatch(getStore(+params.id!));
  }, []);

  function incrementStock(itemId: number) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity + 1 } : item)]
    };

    dispatch(updateStore(storeToUpdate));
  }

  return (
    <>
      {loading && <h2>Loading...</h2>}
      {!loading && error ? <h2>Error: {error}</h2> : ''}
      {!loading && Object.keys(store).length ? (
        <>
          <h1>Manage {store.name}</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Add</th>
                <th>Remove</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {store.stock.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => incrementStock(item.id)}>+</button>
                  </td>
                  <td>-</td>
                  <td>🗑️</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : ''}
    </>
  );
}
