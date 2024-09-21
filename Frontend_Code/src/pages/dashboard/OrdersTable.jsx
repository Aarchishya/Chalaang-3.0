import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

// Sample data for loans
function createData(loan_id, name, amount, status, disbursed) {
  return { loan_id, name, amount, status, disbursed };
}

const rows = [
  createData(87659382, 'Michael Scott', 60000, 1, 50000),
  createData(83746592, 'Dwight Schrute', 15000, 2, 0),
  createData(73625384, 'Jim Halpert', 45000, 1, 45000),
  createData(83729164, 'Pam Beesly', 30000, 0, 0),
  createData(93645281, 'Stanley Hudson', 38000, 2, 0),
  createData(45673829, 'Angela Martin', 50000, 1, 50000),
  createData(12348923, 'Kevin Malone', 40000, 1, 35000),
  createData(92387462, 'Oscar Martinez', 32000, 1, 32000),
  createData(19384756, 'Andy Bernard', 20000, 0, 0),
  createData(23874629, 'Toby Flenderson', 28000, 1, 28000),
  createData(39847651, 'Ryan Howard', 15000, 2, 0),
  createData(78956342, 'Kelly Kapoor', 10000, 0, 0)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'loan_id',
    align: 'left',
    disablePadding: false,
    label: 'Loan ID'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Applicant Name'
  },
  {
    id: 'amount',
    align: 'right',
    disablePadding: false,
    label: 'Total Loan Amount'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Loan Status'
  },
  {
    id: 'disbursed',
    align: 'right',
    disablePadding: false,
    label: 'Total Amount Disbursed'
  }
];

// ==============================|| LOAN TABLE - HEADER ||============================== //

function LoanTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function LoanStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| LOAN TABLE ||============================== //

export default function LoanTable() {
  const order = 'asc';
  const orderBy = 'loan_id';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <LoanTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={row.loan_id}>
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary"> {row.loan_id}</Link>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell>
                    <LoanStatus status={row.status} />
                  </TableCell>
                  <TableCell align="right">
                    <NumericFormat value={row.disbursed} displayType="text" thousandSeparator prefix="$" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

LoanTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

LoanStatus.propTypes = { status: PropTypes.number };
