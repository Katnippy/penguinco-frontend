interface IStockItem {
  id: number,
  name: string,
  image: string
}

interface IStock {
  id: number,
  stockItemId: number | undefined,
  quantity: number
}

interface IStore {
  id: number,
  name: string,
  address: string,
  stock: Array<IStock>,
  updated: string
}

interface IRequest {
  method: string,
  headers: { 'Content-Type': string },
  body: string
}

export type { IStore, IStock, IStockItem, IRequest };
