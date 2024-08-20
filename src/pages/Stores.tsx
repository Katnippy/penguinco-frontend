import { useEffect, useState, ChangeEvent } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControlLabel, MenuItem } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getStores } from '../features/stores/storesSlice';
import { IStore } from '../common/types';
import { STOCK_ITEMS } from '../common/consts';
import Error from './Error';
import StoresTable from '../components/StoresTable';

export default function Stores() {
  const dispatch = useAppDispatch();
  const { loading, stores, error } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());
  }, []);

  const [shownStores, setShownStores] =
    useState<Array<IStore>>(stores ? stores : []);

  // ? Does this need to be a `useEffect()` hook?
  useEffect(() => {
    if (typeof stores !== 'undefined') {
      setShownStores(stores);
    }
  }, [stores]);

  const [filterBy, setFilterBy] = useState('name');
  const [checkedStockItems, setCheckedStockItems] =
    useState<Array<string>>([]);

  // ? Does this need to be a `useEffect()` hook?
  useEffect(() => {
    if (typeof stores !== 'undefined') {
      setShownStores(stores.filter((store) =>
        checkedStockItems.every((checkedStockItem) =>
          (store.stock.map((item) => STOCK_ITEMS![item.stockItemId! - 1].name)
            .includes(checkedStockItem)))));
    }
  }, [checkedStockItems]);

  function handleSelectChange(event: ChangeEvent<HTMLInputElement>) {
    setFilterBy(event.target.value);
  }

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event);
    if (event.target.value !== '') {
      // Set `shownStores` to be every store that includes the search value.
      switch (filterBy) {
        case 'name':
          setShownStores(stores!.filter((store) => store.name.toLowerCase()
            .includes(event.target.value.toLowerCase())));
          break;
        case 'address':
          setShownStores(stores!.filter((store) => store.address.toLowerCase()
            .includes(event.target.value.toLowerCase())));
          break;
        // Set `checkedStockItems` to be every store that includes all of (but
        // not only) the checked stock.
        case 'stock':
          if (event.target.checked) {
            setCheckedStockItems([...checkedStockItems, event.target.value]);
          } else {
            setCheckedStockItems(checkedStockItems.filter((c) =>
              c !== event.target.value));
          }
          break;
      }
    } else {
      setShownStores(stores!);
    }
  }

  return (
    <>
      {!loading && error ? <Error/> : ''}
      {/* TODO: The error page is nondescript - needs a custom page. */}
      {typeof stores === 'undefined' ? <Error/> : ''}
      {typeof stores !== 'undefined' && stores.length ? (
        <>
          {/* Content */}
          <Grid container spacing={0} direction="column"
            justifyContent="center" alignItems="center"
            sx={{ mx: { xs: 1 }, mt: { xs: 4 } }}
          >
            <Grid item>
              {/* Title */}
              <Grid container justifyContent="center" maxWidth="100vw">
                <Grid item>
                  <Typography gutterBottom
                    sx={{ typography: { xs: 'h4' }, ml: { xs: -3 },
                      mb: { xs: 3 } }}
                  >
                    PenguinCo Manager
                  </Typography>
                </Grid>
              </Grid>
              <StoresTable shownStores={shownStores} loading={loading} />
              <Grid container flexDirection="column" maxWidth="100vw"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Grid item>
                  <Typography variant="h5" gutterBottom
                    sx={{ mt: { xs: 3 }, mr: { xs: 4 } }}>
                    Filter stores
                  </Typography>
                </Grid>
                <Grid item>
                  <Box id="box" border={1} borderRadius="5px"
                    sx={{ width: { xs: '90vw' }, mr: { xs: 4 } }}>
                    <Grid container spacing={2}
                      sx={{ mt: { xs: 1 }, mb: { xs: 3 } }}>
                      <Grid item xs={12}>
                        <Grid container justifyContent="center">
                          <TextField select name="filter-by" id="filter-by"
                            value={filterBy} label="Filter by"
                            onChange={handleSelectChange}
                          >
                            <MenuItem key="name" value="name">Name</MenuItem>
                            <MenuItem key="address" value="address">
                              Address
                            </MenuItem>
                            <MenuItem key="stock" value="stock">
                              Stock
                            </MenuItem>
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justifyContent="center"
                          sx={{
                            paddingLeft: { xs: filterBy === 'stock' ? 1.5 : 0 }
                          }}>
                          {filterBy !== 'stock' ?
                            <TextField type={filterBy} id={filterBy}
                              onChange={handleFilterChange} /> :
                          STOCK_ITEMS!.map(({ id, name }) => (
                            <FormGroup key={id}>
                              <FormControlLabel control={
                                <Checkbox id={name} name={name} value={name}
                                  onChange={handleFilterChange}/>
                              } label={name}/>
                            </FormGroup>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : ''}
    </>
  );
}
