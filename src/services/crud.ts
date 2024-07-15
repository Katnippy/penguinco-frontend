import { displayNotification } from
  '../features/notification/notificationSlice';

import { IRequest } from '../common/types';
import { AppStore } from '../app/store';

let store: AppStore;
export function injectStore(_store: AppStore) {
  store = _store;
}

export async function read<T>(url: string): Promise<T> {
  const res = await fetch(url);

  switch (res.status) {
    case 200:
      return res.json();
    case 404:
      throw new Error('404');
    case 500:
      console.error('GET 500: ', res);
      throw new Error('Error');
    default:
      console.error('Unhandled error: ', res);
      throw new Error('Error');
  }
}

export async function update(url: string, req: IRequest) {
  const res = await fetch(url, req);

  switch (res.status) {
    case 204:
      return;
    case 500:
      console.error('PUT 500: ', res);
      store.dispatch(displayNotification(
        'An error has occurred. Please refresh and / or try again!'
      ));
      break;
    default:
      console.error('Unhandled error: ', res);
      store.dispatch(displayNotification(
        'An error has occurred. Please refresh and / or try again!'
      ));
      break;
  }
}
