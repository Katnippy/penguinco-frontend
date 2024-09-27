import { IRequest, IStore } from '../common/types';
import { read, update } from './crud';

const baseUrl =
  'https://app-penguinco-prod-uksouth-002.azurewebsites.net/stores';

async function readAllStores() {
  return await read<Array<IStore>>(baseUrl);
}

async function readStoreById(id: number) {
  return await read<IStore>(`${baseUrl}/${id}`);
}

async function updateStore(id: number, store: IStore) {
  const req: IRequest = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(store),
  };

  return await update(`${baseUrl}/${id}`, req);
}

export default { readAllStores, readStoreById, updateStore };
