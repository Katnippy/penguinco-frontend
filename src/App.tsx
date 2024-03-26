// import { useState } from 'react';

export default function App() {
  const stores = [
    {
      id: 1,
      name: 'PenguinCo Shrewsbury',
      address: 'Shrewsbury, West Midlands, England',
      stock: [
        {
          id: 1,
          name: 'Pingu',
          stock: 10,
        },
        {
          id: 2,
          name: 'Pinga',
          stock: 5,
        },
      ],
    },
    {
      id: 2,
      name: 'PenguinCo Birmingham Superstore',
      address: 'Birmingham, West Midlands, England',
      stock: [
        {
          id: 1,
          name: 'Pingu',
          stock: 47,
        },
        {
          id: 2,
          name: 'Pinga',
          stock: 33,
        },
        {
          id: 3,
          name: 'Tux',
          stock: 3,
        },
        {
          id: 4,
          name: 'Tuxedosam',
          stock: 14,
        },
        {
          id: 5,
          name: 'Suica',
          stock: 10,
        },
        {
          id: 6,
          name: 'Donpen',
          stock: 8,
        },
      ]
    },
    {
      id: 3,
      name: 'PenguinCo Islington',
      address: 'Islington, London, England',
      stock: [
        {
          id: 1,
          name: 'Pingu',
          stock: 23,
        },
        {
          id: 2,
          name: 'Pinga',
          stock: 8,
        },
        {
          id: 4,
          name: 'Tuxedosam',
          stock: 1,
        },
      ],
    },
  ];

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
                      {item.name}: <i>{item.stock} unit{item.stock !== 1 ?
                        's' : ''}</i>
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
