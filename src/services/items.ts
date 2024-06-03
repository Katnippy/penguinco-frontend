import axios from 'axios';

import { IStockItem } from '../common/types';

const baseUrl = 'http://localhost:5275/items';

async function readAll() {
  const res = await axios.get<Array<IStockItem>>(baseUrl);
  return res.data;
}

async function readById(id: number) {
  const res = await axios.get<IStockItem>(`${baseUrl}/${id}`);
  return res.data;
}

export default { readAll, readById };
