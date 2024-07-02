import { IRequest } from '../common/types';

export async function read<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (res.status === 200) {
    return await res.json();
  } else {
    throw new Error;
  }
}

export async function update(url: string, req: IRequest) {
  const res = await fetch(url, req);

  if (res.status === 204) {
    return;
  } else {
    throw new Error;
  }
}
