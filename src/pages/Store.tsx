import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getStore, updateStore } from '../features/store/storeSlice';
import { IStockItem, IStock, IStore } from '../common/types';
import { STOCK_ITEMS, MAX_STOCK_QUANTITY, MIN_STOCK_QUANTITY, NUM_OF_COLS, }
  from '../common/consts';

export default function Store() {
  const params = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { loading, store, error } = useAppSelector((state) => state.store);

  // ? Shouldn't these be undefined?
  const [newStock, setNewStock] =
    useState<IStock>({ id: 1, stockItemId: 1, quantity: 0 });

  useEffect(() => {
    dispatch(getStore(+params.id!));
  }, []);

  // ? Might be able to change loops for direct access?
  let availableStock: Array<IStockItem> = [];
  if (Object.keys(store).length) {
    availableStock = STOCK_ITEMS.filter((stockItem) =>
      !store.stock.map((item) => item.stockItemId).includes(stockItem.id));
  }

  useEffect(() => {
    setNewStock({
      id: Object.keys(store).length &&
        store.stock.length ? store.stock.at(-1)!.id + 1 : 1,
      stockItemId: !availableStock.length ? undefined : availableStock[0].id,
      quantity: 0,
    });
  }, [store]);

  function updateThenReadStore(storeToUpdate: IStore)
  {
    dispatch(updateStore(storeToUpdate))
      .then(() => dispatch(getStore(+params.id!))); // ? Should this promise be resolved, caught, etc.?
  }

  function incrementStock(itemId: number) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity + 1 } : item)]
    };
    updateThenReadStore(storeToUpdate);
  }

  function decrementStock(itemId: number) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity - 1 } : item)]
    };
    updateThenReadStore(storeToUpdate);
  }

  function deleteStock(itemId: number) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.filter((item) => item.id !== itemId)]
    };
    updateThenReadStore(storeToUpdate);
  }

  function addStock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const storeToUpdate: IStore =
      { ...store, stock: [...store.stock, newStock] };
    updateThenReadStore(storeToUpdate);
  }

  function handleNewStockName(event: ChangeEvent<HTMLSelectElement>) {
    setNewStock({ ...newStock, stockItemId: +event.target.value });
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
                <th>Image</th>
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
                  <td><img src={'../../images/pingu.jpg'} /></td>
                  <td>{STOCK_ITEMS[item.stockItemId! - 1].name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => incrementStock(item.id)}
                      disabled={item.quantity === MAX_STOCK_QUANTITY ? true :
                        false}>
                        +
                    </button>
                  </td>
                  <td>
                    <button onClick={() => decrementStock(item.id)}
                      disabled={item.quantity === MIN_STOCK_QUANTITY ? true :
                        false}>
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
            <select value={newStock.stockItemId} onChange={handleNewStockName}>
              {availableStock.map((stock) =>
                <option key={stock.id} value={stock.id}>{stock.name}</option>)}
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
