interface IStockItem {
  id: string;
  name: string;
  image: string;
}

interface IStock {
  id: string;
  stockItemId: number | undefined;
  quantity: number;
}

interface IStore {
  id: string;
  name: string;
  address: string;
  stock: Array<IStock>;
  updated: string;
}

interface IRequest {
  method: string;
  headers: { 'Content-Type': string };
  body: string;
}

export type { IStore, IStock, IStockItem, IRequest };
