import { IStockItem } from '../common/types';

const baseUrl =
  'https://app-penguinco-api-uksouth-dev-001.azurewebsites.net/items';

async function readAll(): Promise<Array<IStockItem>> {
  const res = await fetch(baseUrl);

  return await res.json();
}

async function readById(id: number): Promise<IStockItem> {
  const res = await fetch(`${baseUrl}/${id}`);

  return await res.json();
}

export default { readAll, readById };
