import { useEffect, useState, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getStores } from '../features/stores/storesSlice';
import { IStore } from '../common/types';
import { STOCK_ITEMS } from '../common/consts';
import Error from './Error';
import StoresTable from '../components/StoresTable';

export default function Stores() {
  const dispatch = useAppDispatch();
  const { loading, stores, error } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());
  }, []);

  const [shownStores, setShownStores] =
    useState<Array<IStore>>(stores ? stores : []);

  // ? Does this need to be a `useEffect()` hook?
  useEffect(() => {
    if (typeof stores !== 'undefined') {
      setShownStores(stores);
    }
  }, [stores]);

  const [filterBy, setFilterBy] = useState('name');
  const [checkedStockItems, setCheckedStockItems] =
    useState<Array<string>>([]);

  // ? Does this need to be a `useEffect()` hook?
  useEffect(() => {
    if (typeof stores !== 'undefined') {
      setShownStores(stores.filter((store) =>
        checkedStockItems.every((checkedStockItem) =>
          (store.stock.map((item) => STOCK_ITEMS![item.stockItemId! - 1].name)
            .includes(checkedStockItem)))));
    }
  }, [checkedStockItems]);

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setFilterBy(event.target.value);
  }

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value !== '') {
      // Set `shownStores` to be every store that includes the search value.
      switch (filterBy) {
        case 'name':
          setShownStores(stores!.filter((store) => store.name.toLowerCase()
            .includes(event.target.value.toLowerCase())));
          break;
        case 'address':
          setShownStores(stores!.filter((store) => store.address.toLowerCase()
            .includes(event.target.value.toLowerCase())));
          break;
        // Set `checkedStockItems` to be every store that includes all of (but
        // not only) the checked stock.
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
      setShownStores(stores!);
    }
  }

  return (
    <>
      {!loading && error ? <Error/> : ''}
      {/* ! The error page is nondescript - needs a custom page! */}
      {typeof stores === 'undefined' ? <Error/> : ''}
      {typeof stores !== 'undefined' && stores.length ? (
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
            STOCK_ITEMS!.map(({ id, name }) => (
              <div key={id}>
                <input type="checkbox" id={name} name={name} value={name}
                  onChange={handleFilterChange} />
                <label htmlFor={name}>{name}</label>
                <br />
              </div>
            ))}
          <StoresTable shownStores={shownStores} loading={loading} />
        </>
      ) : ''}
    </>
  );
}
