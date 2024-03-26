import { useState, useEffect } from 'react';

import { IStore } from '../../common/types';
import storeService from '../../services/stores';

export default function Index() {
  const [stores, setStores] = useState<Array<IStore>>([]);

  useEffect(() => {
    void (async function hook() {
      try {
        const initialStores = await storeService.read();
        setStores(initialStores);
      } catch (e) {
        console.error('Error getting data: ', e);
      }
    })();
  }, []);

  return (
    <>
      <h1>PenguinCo Stores</h1>
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
                      {item.name}: <i>{item.quantity} unit{item.quantity !== 1
                        ? 's' : ''}</i>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button>Manage</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
