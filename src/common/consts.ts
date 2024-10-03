import itemService from '../services/items';
import { IStockItem } from './types';

let STOCK_ITEMS: Array<IStockItem> | void;
try {
  STOCK_ITEMS = await itemService.readAllStockItems();
} catch {} // eslint-disable-line no-empty

const MIN_STOCK_QUANTITY = 0;
const MAX_STOCK_QUANTITY = 99;

export { STOCK_ITEMS, MIN_STOCK_QUANTITY, MAX_STOCK_QUANTITY };
