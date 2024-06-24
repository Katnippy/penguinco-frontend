import TableCell from '@mui/material/TableCell';
import { Skeleton } from '@mui/material';

type SkeletonCellProps = {
  animation: false | 'pulse' | 'wave',
  variant: 'text' | 'rectangular' | 'rounded' | 'circular',
  first?: boolean
};

export default function SkeletonCell(
  { animation, variant, first = false }: SkeletonCellProps
) {
  return (
    <TableCell component={first ? 'th' : undefined}
      scope={first ? 'row' : undefined} align="center">
      <Skeleton animation={animation} variant={variant} />
    </TableCell>
  );
}
