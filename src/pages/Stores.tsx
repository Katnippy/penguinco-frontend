import { useEffect, useState, ChangeEvent } from 'react';

import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getStores } from '../features/stores/storesSlice';
import { IStore } from '../common/types';
import { STOCK_ITEMS } from '../common/consts';

export default function Stores() {
  const dispatch = useAppDispatch();
  const { loading, stores, error } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());
  }, []);

  const [shownStores, setShownStores] = useState<Array<IStore>>(stores);

  // ? Does this need to be a `useEffect()` hook?
  useEffect(() => {
    setShownStores(stores);
  }, [stores]);

  const [filterBy, setFilterBy] = useState('name');
  const [checkedStockItems, setCheckedStockItems] =
    useState<Array<string>>([]);

  // ? Does this need to be a `useEffect()` hook?
  useEffect(() => {
    setShownStores(stores.filter((store) =>
      checkedStockItems.every((checkedStockItem) =>
        (store.stock.map((item) => STOCK_ITEMS[item.stockItemId! - 1].name)
          .includes(checkedStockItem)))));
  }, [checkedStockItems]);

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setFilterBy(event.target.value);
  }

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value !== '') {
      switch (filterBy) {
        case 'name':
          setShownStores(stores.filter((store) => store.name.toLowerCase()
            .includes(event.target.value.toLowerCase())));
          break;
        case 'address':
          setShownStores(stores.filter((store) => store.address.toLowerCase()
            .includes(event.target.value.toLowerCase())));
          break;
        // Set `shownStores` to be every store already being shown that
        // includes all of (but not only) the checked stock.
        case 'stock':
          if (event.target.checked) {
            setCheckedStockItems([...checkedStockItems, event.target.value]);
          } else {
            setCheckedStockItems(checkedStockItems.filter((c) =>
              c !== event.target.value));
          }
          break;
      }
    } else {
      setShownStores(stores);
    }
  }

  return (
    <>
      <h1>PenguinCo Stores</h1>
      <h2>Filter stores by {filterBy}</h2>
      <select onChange={handleSelectChange}>
        <option key="name" value="name">Name</option>
        <option key="address" value="address">Address</option>
        <option key="stock" value="stock">Stock</option>
      </select>
      {filterBy !== 'stock' ?
        <input id="filter" onChange={handleFilterChange} /> :
        STOCK_ITEMS.map(({ id, name }) => (
          <div key={id}>
            <input type="checkbox" id={name} name={name} value={name}
              onChange={handleFilterChange} />
            <label htmlFor={name}>{name}</label>
            <br />
          </div>
        ))}
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
              <th>Updated</th>
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
                        {STOCK_ITEMS[item.stockItemId! - 1].name}:
                        <i>
                          {item.quantity} unit{item.quantity!== 1 ? 's' : ''}
                        </i>
                      </li>
                    )) : 'No stock...'}
                  </ul>
                </td>
                <td>
                  <Link to={`/stores/${store.id.toString()}`}>
                    <button>Manage</button>
                  </Link>
                </td>
                <td>{DateTime.fromISO(store.updated).toFormat('dd/MM/yy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : ''}
    </>
  );
}
