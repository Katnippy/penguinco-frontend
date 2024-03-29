import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getStore, updateStore } from '../features/store/storeSlice';
import { IStore } from '../common/types';

export default function Store() {
  const MIN_QUANTITY = 0;
  const MAX_QUANTITY = 99;
  const NUM_OF_COLS = 5;

  const params = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { loading, store, error } = useAppSelector((state) => state.store);

  // ? Shouldn't these be undefined?
  const [newStock, setNewStock] =
    useState({ id: 1, name: '', quantity: 0, });

  useEffect(() => {
    dispatch(getStore(+params.id!));
  }, []);

  const allStock = [
    'Pingu',
    'Pinga',
    'Tux',
    'Tuxedosam',
    'Suica',
    'Donpen',
    'Pen Pen',
    'Private',
    'Skipper',
    'Kowalski',
    'Rico',
  ];
  let availableStock: Array<string> = [];
  if (Object.keys(store).length) {
    availableStock = allStock.filter((stock) =>
      !store.stock.map((item) => item.name).includes(stock));
  }

  useEffect(() => {
    setNewStock({
      id: Object.keys(store).length &&
        store.stock.length ? store.stock.at(-1)!.id + 1 : 1,
      name: availableStock[0],
      quantity: 0,
    });
  }, [store]);

  function incrementStock(itemId: number) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity + 1 } : item)]
    };
    dispatch(updateStore(storeToUpdate));
  }

  function decrementStock(itemId: number) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity - 1 } : item)]
    };
    dispatch(updateStore(storeToUpdate));
  }

  function deleteStock(itemId: number) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.filter((item) => item.id !== itemId)]
    };
    dispatch(updateStore(storeToUpdate));
  }

  function addStock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const storeToUpdate: IStore =
      { ...store, stock: [...store.stock, newStock] };
    dispatch(updateStore(storeToUpdate));
  }

  function handleNewStockName(event: ChangeEvent<HTMLSelectElement>) {
    setNewStock({ ...newStock, name: event.target.value });
  }

  function handleNewStockQuantity(event: ChangeEvent<HTMLInputElement>) {
    setNewStock({ ...newStock, quantity: +event.target.value });
  }

  return (
    <>
      {loading && <h2>Loading...</h2>}
      {!loading && error ? <h2>Error: {error}</h2> : ''}
      {!loading && Object.keys(store).length ? (
        <>
          <h1>Manage {store.name}</h1>
          <Link to={'/stores'}>
            <button>Return</button>
          </Link>
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
              {store.stock.length ? store.stock.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => incrementStock(item.id)}
                      disabled={item.quantity === MAX_QUANTITY ? true : false}>
                        +
                    </button>
                  </td>
                  <td>
                    <button onClick={() => decrementStock(item.id)}
                      disabled={item.quantity === MIN_QUANTITY ? true : false}>
                        -
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteStock(item.id)}>🗑️</button>
                  </td>
                </tr>
              )) : <tr><td colSpan={NUM_OF_COLS}>No stock...</td></tr>}
            </tbody>
          </table>
          <h2>New stock</h2>
          <form onSubmit={addStock}>
            <label htmlFor="name">Name: </label>
            <select value={newStock.name} onChange={handleNewStockName}>
              {availableStock.map((stock) =>
                <option key={stock} value={stock}>{stock}</option>)}
            </select>
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" value={newStock.quantity}
              onChange={handleNewStockQuantity} min="0" max="99" required />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : ''}
    </>
  );
}
