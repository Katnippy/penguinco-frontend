import itemService from '../services/items';

const STOCK_ITEMS = await itemService.readAll();

const MIN_STOCK_QUANTITY = 0;
const MAX_STOCK_QUANTITY = 99;
const NUM_OF_COLS = 5;

export { STOCK_ITEMS, MIN_STOCK_QUANTITY, MAX_STOCK_QUANTITY, NUM_OF_COLS };
