import { IRequest } from '../common/types';

export async function read<T>(url: string): Promise<T> {
  const res = await fetch(url);

  return await res.json();
}

export async function update<T>(url: string, req: IRequest): Promise<T> {
  const res = await fetch(url, req);

  return await res.json();
}
