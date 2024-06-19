import { IStockItem } from '../common/types';
import { read } from './crud';

const baseUrl =
  'https://app-penguinco-api-uksouth-dev-001.azurewebsites.net/items';

async function readAllStockItems() {
  return await read<Array<IStockItem>>(baseUrl);
}

async function readStockItemById(id: number) {
  return await read<IStockItem>(`${baseUrl}/${id}`);
}

export default { readAllStockItems, readStockItemById };
