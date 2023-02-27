import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from '@mui/material';
// routes
import { PATH_CUSTOMER } from '../../routes/paths';
// @types
import { ICustomer, CustomerSearchParams, CustomerStatus } from '../../@types/customer';
// _mock_

// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// sections
import { CustomerTableToolbar, CustomerTableRow } from '../../sections/customer/list/index';
import { useCustomer } from 'src/modules/customer/hooks/useCustomer';
import { useSnackbar } from 'src/components/snackbar';
import { buildCustomerWhereFilter } from 'src/modules/customer/helpers/buildWhereFilter';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const TABLE_HEAD = [

  { id: 'title', label: 'Customer', align: 'left' },
  { id: 'address.area', label: 'Area', align: 'left' },
  { id: 'address.pincode', label: 'Pincode', align: 'left' },
  { id: 'contactPerson', label: 'Person In Contact', align: 'left' },
  { id: 'contactMobile', label: 'Mobile', align: 'left' },
  { id: 'isActive', label: 'Active', align: 'center' },
  { id: 'isVerified', label: 'Verified', align: 'center' },
  { id: 'actions', label: '', align: 'center' },
];

// ----------------------------------------------------------------------

customerListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function customerListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();


  const [filter, setFilter] = useState({})
  const { push } = useRouter();
  const { getManyWithFilters, remove: deleteCustomer } = useCustomer();
  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const [searchParam, setsearchParam] = useState<any | undefined>(CustomerSearchParams.TITLE)
  const [searchQ, setsearchQ] = useState("")
  const { enqueueSnackbar } = useSnackbar();


  async function getCustomers(filter: any, reload?: any) {
    const _result: any = await getManyWithFilters(filter);
    await _result;
    if (_result?.data) {

      setTableData(_result?.data);
    } else {

      setTableData([]);
    }
  }
  useEffect(() => {
    getCustomers(filter);
  }, [

  ]);







  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = searchParam !== undefined || filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatus(newValue);
  };



  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setsearchQ(event.target.value);
  };
  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = async (id: string) => {
    handleCloseConfirm();
    const deletedCustomer = await deleteCustomer(id);
    await deletedCustomer;

    if (deletedCustomer?.data.success) {
      enqueueSnackbar('Customer Deleted  Successfully');
      getCustomers(filter);
    } else {
      enqueueSnackbar(' This Customer Cant be Deleted');
    }


  };

  const handleDeleteRows = (selectedRows: string[]) => {
    handleCloseConfirm();
    const deleteRows = tableData.filter((row: any) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const onSearchSubmit = () => {
    const _query = buildCustomerWhereFilter(searchParam, searchQ, filterStatus)
    getCustomers({
      ..._query
    });
  };

  const handleEditRow = (id: string) => {
    push(PATH_CUSTOMER.edit(paramCase(id.toString())));
  };
  const handleDetailRow = (id: string) => {
    push(PATH_CUSTOMER.detail(paramCase(id.toString())));
  };
  const handleResetFilter = () => {
    setFilterName('');

    setFilterStatus('ALL');
    setsearchParam(undefined)
    setsearchQ('')
    getCustomers({});
  };

  const handleSearchParam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setsearchParam(event.target.value)
  };


  let _filterStatus: any[] = ['ALL'];
  _filterStatus = [_filterStatus, ...Object.keys(CustomerStatus)];


  let _searchParams: any[] = [];
  _searchParams = [_searchParams, ...Object.keys(CustomerSearchParams)];


  useEffect(() => {
    const _query = buildCustomerWhereFilter(searchParam, searchQ, filterStatus)
    getCustomers({
      ..._query
    });
  }, [filterStatus])

  return (
    <>
      <Head>
        <title>Customers: List  </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Customers"
          links={[{ name: 'All', href: PATH_CUSTOMER.root }, { name: 'List' }]}
          action={
            <Button
              component={NextLink}
              href={PATH_CUSTOMER.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Customer
            </Button>
          }
        />
        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {_filterStatus.map((tab: any) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>
          <Divider />
          <CustomerTableToolbar
            searchParams={_searchParams}
            searchParam={searchParam}
            isFiltered={isFiltered}
            searchValue={searchQ}
            filterRole={filterRole}
            onSearchValue={handleSearchValue}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
            onSearchParam={handleSearchParam}
            onSearchSubmit={onSearchSubmit}
          />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row: any) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row: any) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <CustomerTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDetailRow={() => handleDetailRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
}: {
  inputData: ICustomer[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterRole: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (customer) => customer.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
function enqueueSnackbar(arg0: string) {
  throw new Error('Function not implemented.');
}
