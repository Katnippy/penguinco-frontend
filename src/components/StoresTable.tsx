import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Storefront } from '@mui/icons-material';
import { DateTime } from 'luxon';

import { IStore } from '../common/types';
import { STOCK_ITEMS } from '../common/consts';
import SkeletonCell from './SkeletonCell';

type StoresTableProps = {
  shownStores: Array<IStore>,
  loading: boolean
};

export default function StoresTable(
  { shownStores, loading }: StoresTableProps
) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: { lg: 1200 } }}>
      <Table aria-label="stores-table"
        sx={{ minWidth: { xs: 650, md: 875, lg: 1000 } }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center">Manage</TableCell>
            <TableCell align="center">Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shownStores.map((store) => (
            <TableRow key={store.id}>
              {!loading ?
                <>
                  <TableCell component="th" scope="row" align="center">
                    {store.name}
                  </TableCell>
                  <TableCell align="center">{store.address} </TableCell>
                  <TableCell align="center">
                    <div className="stock">
                      <ul>
                        {store.stock.length ? store.stock.map((item) => (
                          <li key={item.id}>
                            {STOCK_ITEMS![item.stockItemId! - 1].name}:&nbsp;
                            <i>
                              {item.quantity} unit{item.quantity!== 1 ? 's' : ''}
                            </i>
                          </li>
                        )) : 'No stock...'}
                      </ul>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/stores/${store.id.toString()}`}>
                      <IconButton >
                        <Storefront />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {DateTime.fromISO(store.updated).toFormat('dd/MM/yy')}
                  </TableCell>
                </> :
                <>
                  <SkeletonCell first={true} animation={'wave'}
                    variant={'text'} />
                  <SkeletonCell animation={'wave'} variant={'text'} />
                  <SkeletonCell animation={'wave'} variant={'text'} />
                  <SkeletonCell animation={'wave'} variant={'rectangular'} />
                  <SkeletonCell animation={'wave'} variant={'text'} />
                </>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
