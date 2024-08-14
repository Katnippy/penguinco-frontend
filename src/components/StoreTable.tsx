import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import { IStock } from '../common/types';
import { STOCK_ITEMS, MAX_STOCK_QUANTITY, MIN_STOCK_QUANTITY }
  from '../common/consts';
import SkeletonCell from './SkeletonCell';

type StoreTableProps = {
  loading: boolean,
  stock: Array<IStock>,
  incrementStock: (itemId: string) => void,
  decrementStock: (itemId: string) => void,
  deleteStock: (itemId: string) => void,
};

export default function StoreTable({
  loading,
  stock,
  incrementStock,
  decrementStock,
  deleteStock
}: StoreTableProps) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: { md: 450 } }}>
      <Table aria-label="store-table" stickyHeader sx={{ minWidth: { md: 650 } }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Add</TableCell>
            <TableCell align="center">Remove</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stock.map((item) => (
            <TableRow key={item.id}>
              {!loading ?
                <>
                  <TableCell component="th" scope="row" align="center">
                    <img src={STOCK_ITEMS[item.stockItemId! - 1].image} />
                  </TableCell>
                  <TableCell align="center">
                    {STOCK_ITEMS[item.stockItemId! - 1].name}
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => incrementStock(item.id)}
                      disabled={item.quantity === MAX_STOCK_QUANTITY ? true :
                        false}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => decrementStock(item.id)}
                      disabled={item.quantity === MIN_STOCK_QUANTITY ? true :
                        false}>
                      <RemoveIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => deleteStock(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </> :
                <>
                  <SkeletonCell first={true} animation={'wave'}
                    variant={'rectangular'} />
                  <SkeletonCell animation={'wave'} variant={'text'} />
                  <SkeletonCell animation={'wave'} variant={'text'} />
                  <SkeletonCell animation={'wave'} variant={'rectangular'} />
                  <SkeletonCell animation={'wave'} variant={'rectangular'} />
                  <SkeletonCell animation={'wave'} variant={'rectangular'} />
                </>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
