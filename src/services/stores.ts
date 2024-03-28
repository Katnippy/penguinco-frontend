import axios from 'axios';

import { IStore } from '../common/types';

const baseUrl = 'http://localhost:3001/stores';

// async function create(newObject) {
//   const res = await axios.post(baseUrl, newObject);
//   return res.data;
// }

async function readAll() {
  const res = await axios.get<Array<IStore>>(baseUrl);
  return res.data;
}

async function readById(id: number) {
  const res = await axios.get<IStore>(`${baseUrl}/${id}`);
  return res.data;
}

async function update(id: number, store: IStore) {
  const res = await axios.put(`${baseUrl}/${id}`, store);
  return res.data;
}

// async function destroy(id) {
//   await axios.delete(`${baseUrl}/${id}`);
// }


export default { readAll, readById, update };
