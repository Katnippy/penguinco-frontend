interface IStore {
  id: number, // ! JSON Server changes this 😡
  name: string,
  address: string,
  stock: Array<{ id: number, name: string, quantity: number, image: string }>
}

export type { IStore };
