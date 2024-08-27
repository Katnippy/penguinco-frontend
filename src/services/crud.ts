import { displayNotification } from
  '../features/notification/notificationSlice';

import { IRequest } from '../common/types';
import { AppStore } from '../app/store';

let _store: AppStore;
export function injectStore(store: AppStore) {
  _store = store;
}

function getErrorMessage(e: unknown) {
  if (e instanceof Error) {
    return e.message;
  } else {
    return String(e);
  }
}

export async function read<T>(url: string): Promise<T | void> {
  let res: Response;

  try {
    res = await fetch(url);

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
  } catch (e) {
    switch (getErrorMessage(e)) {
      case '404':
        throw new Error('404');
      default:
        console.error('Unhandled error:', e);
        throw new Error('Error');
    }
  }
}

export async function update(url: string, req: IRequest) {
  let res: Response;

  try {
    res = await fetch(url, req);

    switch (res.status) {
      case 204:
        return;
      case 500:
        console.error('PUT 500: ', res);
        _store.dispatch(displayNotification(
          'An error has occurred. Please refresh and / or try again!'
        ));
        break;
      default:
        console.error('Unhandled error: ', res);
        _store.dispatch(displayNotification(
          'An error has occurred. Please refresh and / or try again!'
        ));
        break;
    }
  } catch (e) {
    switch (getErrorMessage(e)) {
      default:
        console.error('Unhandled error:', e);
        throw new Error('Error');
    }
  }
}
