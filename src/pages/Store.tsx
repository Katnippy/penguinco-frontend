import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, FormControl, MenuItem }
  from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetState, getStore, updateStore } from
  '../features/store/storeSlice';
import { IStockItem, IStock, IStore } from '../common/types';
import { STOCK_ITEMS } from '../common/consts';
import Notification from '../components/Notification';
import NotFound from './NotFound';
import Error from './Error';
import StoreTable from '../components/StoreTable';

export default function Store() {
  const params = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { loading, store, error } = useAppSelector((state) => state.store);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getStore(+params.id!));
  }, []);

  // ? Might be able to change loops for direct access?
  // Set `availableStock` to be every stock item not already in stock by
  // filtering out existing item ids.
  let availableStock: Array<IStockItem> = [];
  if (Object.keys(store).length) {
    availableStock = STOCK_ITEMS.filter((stockItem) =>
      !store.stock.map((item) => item.stockItemId).includes(+stockItem.id)
    );
  }

  // ? Shouldn't these be undefined?
  const [newStock, setNewStock] =
    useState<IStock>({ id: '1', stockItemId: 1, quantity: 0 });

  // ? Does this need to be a `useEffect()`?
  useEffect(() => {
    setNewStock({
      id: Object.keys(store).length &&
        store.stock.length ? (+store.stock.at(-1)!.id + 1).toString() : '1',
      stockItemId: !availableStock.length ? undefined : +availableStock[0].id,
      quantity: 0,
    });
  }, [store]);

  function updateThenReadStore(storeToUpdate: IStore)
  {
    dispatch(updateStore(storeToUpdate))
      // ? Should this promise be resolved, caught, etc.?
      .then(() => dispatch(getStore(+params.id!)));
  }

  function incrementStock(itemId: string) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity + 1 } : item)],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function decrementStock(itemId: string) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity - 1 } : item)],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function deleteStock(itemId: string) {
    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock.filter((item) => item.id !== itemId)],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function addStock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const storeToUpdate: IStore = {
      ...store,
      stock: [...store.stock, newStock],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function handleNewStockName(event: ChangeEvent<HTMLInputElement>) {
    setNewStock({ ...newStock, stockItemId: +event.target.value });
  }

  function handleNewStockQuantity(event: ChangeEvent<HTMLInputElement>) {
    setNewStock({ ...newStock, quantity: +event.target.value });
  }

  return (
    <>
      {!loading && error &&
        (error === '404' ? <NotFound /> : error === 'Error' ? <Error /> : '')
      }
      {Object.keys(store).length ? (
        <Grid container spacing={0} direction="column" justifyContent="center"
          alignItems="center" sx={{ mt: { xs: 2, sm: 6 }, mx: { xs: 1 } }}>
          <Grid item>
            <Grid container spacing={2} maxWidth="100vw"
              sx={{ alignItems: { xs: 'center', sm: 'normal' },
                mb: { xs: 1 } }}
            >
              <Grid item xs={6} sm={11}>
                <Typography
                  sx={{ typography: { xs: 'h4', sm: 'h3' }, ml: { xs: 1 } }}
                  gutterBottom
                >
                Manage {store.name}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={1}>
                <Grid container justifyContent='center'>
                  <Grid item sx={{ ml: { xs: 1 } }}>
                    <Link to={'/stores'}>
                      <Button variant="outlined"
                        sx={{ mb: { xs: 2 } }}>
                      Return
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Notification />
            <StoreTable loading={loading} stock={store.stock}
              incrementStock={incrementStock} decrementStock={decrementStock}
              deleteStock={deleteStock}
            />
            <Grid container flexDirection="column" maxWidth="100vw">
              <Grid item>
                <Typography variant="h5" gutterBottom
                  sx={{ mt: 3, mr: { xs: 4 }, textAlign: 'center' }}>
              New stock
                </Typography>
              </Grid>
              <Grid item>
                <Box sx={{ border: 1, mr: { xs: 4 } }}>
                  <form onSubmit={addStock}>
                    <FormControl fullWidth>
                      <Grid container sx={{ my: { xs: 3 } }}>
                        <Grid item xs={6}>
                          <Grid container
                            sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField select name="name" id="name"
                              value={newStock.stockItemId === undefined ? '' :
                                newStock.stockItemId}
                              label="Name" onChange={handleNewStockName}
                            >
                              {availableStock.map((stock) =>
                                <MenuItem key={stock.id} value={stock.id}>
                                  {stock.name}
                                </MenuItem>
                              )}
                            </TextField>
                          </Grid>
                        </Grid>
                        <Grid item xs={6}>
                          <Grid container
                            sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField
                              type="number" id="quantity" label="Quantity"
                              value={newStock.quantity}
                              onChange={handleNewStockQuantity}
                              InputProps={{ inputProps: { min: 0, max: 9999 } }}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12}
                          sx={{ display: 'flex', justifyContent: 'center',
                            mt: { xs: 2 }, mb: { xs: -1 } }}
                        >
                          <Button type="submit" variant="contained">
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : ''}
    </>
  );
}
