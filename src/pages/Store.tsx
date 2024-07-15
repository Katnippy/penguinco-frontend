import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetState, getStore, updateStore } from
  '../features/store/storeSlice';
import { IStockItem, IStock, IStore } from '../common/types';
import { STOCK_ITEMS } from '../common/consts';
import Notification from '../components/Notification';
import NotFound from './NotFound';
import StoreTable from '../components/StoreTable';

export default function Store() {
  const params = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { loading, store, error } = useAppSelector((state) => state.store);
  // const { notification } = useAppSelector((state) => state.notification);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getStore(+params.id!));
  }, []);

  // ? Might be able to change loops for direct access?
  // Set `availableStock` to be every stock item not already in stock by
  // filtering out existing item ids.
  let availableStock: Array<IStockItem> = [];
  if (Object.keys(store).length) {
    availableStock = STOCK_ITEMS.filter((stockItem) =>
      !store.stock.map((item) => item.stockItemId).includes(+stockItem.id)
    );
  }

  // ? Shouldn't these be undefined?
  const [newStock, setNewStock] =
    useState<IStock>({ id: '1', stockItemId: 1, quantity: 0 });

  // ? Does this need to be a `useEffect()`?
  useEffect(() => {
    setNewStock({
      id: Object.keys(store).length &&
        store.stock.length ? (+store.stock.at(-1)!.id + 1).toString() : '1',
      stockItemId: !availableStock.length ? undefined : +availableStock[0].id,
      quantity: 0,
    });
  }, [store]);

  function updateThenReadStore(storeToUpdate: IStore)
  {
    dispatch(updateStore(storeToUpdate))
      // ? Should this promise be resolved, caught, etc.?
      .then(() => dispatch(getStore(+params.id!)));
  }

  function incrementStock(itemId: string) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity + 1 } : item)],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function decrementStock(itemId: string) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity - 1 } : item)],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function deleteStock(itemId: string) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.filter((item) => item.id !== itemId)],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function addStock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock, newStock],
      updated: DateTime.now().toISODate()
    };
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
      {!loading && error && (error === '404' ? <NotFound /> : '')}
      {Object.keys(store).length ? (
        <>
          <h1>Manage {store.name}</h1>
          <Link to={'/stores'}>
            <button>Return</button>
          </Link>
          {/* {notification ? <Notification notification={notification}/> : ''} */}
          <Notification />
          <StoreTable loading={loading} stock={store.stock}
            incrementStock={incrementStock} decrementStock={decrementStock}
            deleteStock={deleteStock}
          />
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
