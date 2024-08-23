import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, FormControl, MenuItem } from '@mui/material';
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
  if (typeof store !== 'undefined' && Object.keys(store).length) {
    availableStock = STOCK_ITEMS!.filter((stockItem) =>
      !store.stock.map((item) => item.stockItemId).includes(+stockItem.id)
    );
  }

  // ? Shouldn't these be undefined?
  const [newStock, setNewStock] =
    useState<IStock>({ id: '1', stockItemId: 1, quantity: 0 });

  // ? Does this need to be a `useEffect()`?
  useEffect(() => {
    setNewStock({
      id: typeof store !== 'undefined' && Object.keys(store).length &&
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
      ...(store as IStore),
      stock: [...store!.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity + 1 } : item)],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function decrementStock(itemId: string) {
    const storeToUpdate: IStore = {
      ...(store as IStore),
      stock: [...store!.stock.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity - 1 } : item)],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function deleteStock(itemId: string) {
    const storeToUpdate: IStore = {
      ...(store as IStore),
      stock: [...store!.stock.filter((item) => item.id !== itemId)],
      updated: DateTime.now().toISODate()
    };
    updateThenReadStore(storeToUpdate);
  }

  function addStock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const storeToUpdate: IStore = {
      ...(store as IStore),
      stock: [...store!.stock, newStock],
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
      {/* ! The error page is nondescript - needs a custom page! */}
      {typeof store === 'undefined' ? <Error/> : ''}
      {typeof store !== 'undefined' && Object.keys(store).length ? (
        // Container
        <div id="container">
          {/* Content */}
          <Grid container spacing={0} direction="column"
            justifyContent="center" alignItems="center"
            sx={{ mx: { xs: 1, sm: 0 }, mt: { xs: 2, sm: 6, md: 0 } }}
          >
            <Grid item>
              {/* Title and return button */}
              <Grid container spacing={2} maxWidth="100vw"
                sx={{ alignItems: { xs: 'center', sm: 'normal' }, mb: 1 }}
              >
                {/* Title */}
                <Grid item xs={6} sm={10} md={11}
                  sx={{ paddingTop: { md: '0 !important' } }}>
                  <Typography gutterBottom
                    sx={{ typography: { xs: 'h4', md: 'h3' }, ml: 1 }}>
                    Manage {store.name}
                  </Typography>
                </Grid>
                {/* Return button */}
                <Grid item xs={6} sm={2} md={1}>
                  <Grid container justifyContent='center'
                    sx={{ width: { xs: '83.5vw', sm: 'auto' } }}>
                    <Grid item sx={{ ml: 1 }}>
                      <Link to={'/stores'}>
                        <Button variant="outlined" sx={{
                          mt: { md: -0.5 }, mr: { xs: 14, sm: 0, md: 9 },
                          ml: { sm: -1, md: 1, lg: 3 }, mb: { xs: 2, sm: 0 }
                        }}>
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
              {/* New stock box */}
              <Grid container flexDirection="column" maxWidth="100vw"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                {/* Title */}
                <Grid item>
                  <Typography variant="h5" textAlign="center" gutterBottom
                    sx={{ mt: 3, mr: { xs: 4, sm: 0 } }}>
                  New stock
                  </Typography>
                </Grid>
                {/* New stock form */}
                <Grid item>
                  <Box id="box" border={1} borderRadius="5px"
                    sx={{ width: { sm: '60vw', md: '50vw', lg: '30vw' },
                      mr: { xs: 4, sm: 0 } }}
                  >
                    <form onSubmit={addStock}>
                      <FormControl fullWidth>
                        {/* TODO: Put spacing in component. */}
                        <Grid container sx={{ spacing: 2,
                          my: { xs: 3, sm: 3.5 } }}>
                          {/* Name input */}
                          <Grid item xs={6} sm={5}>
                            <Grid container sx={{ display: 'flex',
                              justifyContent: 'center' }}>
                              <TextField select name="name" id="name"
                                value={newStock.stockItemId === undefined ? ''
                                  : newStock.stockItemId}
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
                          {/* Quantity input */}
                          <Grid item xs={6} sm={3}>
                            <Grid container sx={{ display: 'flex',
                              justifyContent: 'center' }}>
                              <TextField
                                type="number" id="quantity" label="Quantity"
                                value={newStock.quantity}
                                onChange={handleNewStockQuantity}
                                InputProps=
                                  {{ inputProps: { min: 0, max: 9999 } }}
                              />
                            </Grid>
                          </Grid>
                          {/* Submit button */}
                          <Grid item xs={12} sm={4}
                            sx={{ display: 'flex' , justifyContent: 'center',
                              mt: { xs: 2, sm: 1.25 }, mb: { xs: -1, sm: 0 } }}
                          >
                            <Button type="submit" variant="contained"
                              sx={{ alignSelf: 'flex-start' }}>
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
        </div>
      ) : ''}
    </>
  );
}
