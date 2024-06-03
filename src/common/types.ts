interface IStockItem {
  id: number,
  name: string
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
  stock: Array<IStock>
}

export type { IStore, IStock, IStockItem };
