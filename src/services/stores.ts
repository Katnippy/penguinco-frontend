import { IStore } from '../common/types';

const baseUrl =
  'https://app-penguinco-api-uksouth-dev-001.azurewebsites.net/stores';

// async function create(newObject) {
//   const res = await axios.post(baseUrl, newObject);
//   return res.data;
// }

async function readAll(): Promise<Array<IStore>> {
  const res = await fetch(baseUrl);

  return await res.json();
}

async function readById(id: number): Promise<IStore> {
  const res = await fetch(`${baseUrl}/${id}`);

  return await res.json();
}

async function update(id: number, store: IStore): Promise<void> {
  const req = { method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(store)
  };
  const res = await fetch(`${baseUrl}/${id}`, req);

  return await res.json();
}

// async function destroy(id) {
//   await axios.delete(`${baseUrl}/${id}`);
// }

export default { readAll, readById, update };
