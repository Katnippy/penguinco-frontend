interface IStore {
  id: number,
  name: string,
  address: string,
  stock: Array<{ id: number, name: string, quantity: number }>
}

export type { IStore };
