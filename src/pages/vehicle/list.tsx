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
import { PATH_VEHICLE } from '../../routes/paths';
// @types
import { IVehicle, VehicleFilter, VehicleSearchParams } from '../../@types/vehicle';
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
import { VehicleTableToolbar, VehicleTableRow } from '../../sections/vehicle/list/index';
import { useVehicle } from 'src/modules/vehicle/hooks/useVehicle';
import { useSnackbar } from 'src/components/snackbar';
import { buildVehicleWhereFilter } from 'src/modules/vehicle/helpers/buildWhereFilter';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const TABLE_HEAD = [
  { id: 'registerNo', label: 'REG No', align: 'left' },
  { id: 'type', label: 'Segment', align: 'left' },
  { id: 'permitType', label: 'Permit', align: 'left' },
  { id: 'make', label: 'Make', align: 'left' },
  { id: 'model', label: 'Model', align: 'left' },
  { id: 'year', label: 'Year', align: 'left' },
  { id: 'color', label: 'Color', align: 'left' },
  { id: 'seatcing', label: 'Seating', align: 'left' },
  { id: 'fuelType', label: 'Fuel Type', align: 'left' },
  { id: 'vendor', label: 'Vendor', align: 'left' },
];

// ----------------------------------------------------------------------

vehicleListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function vehicleListPage() {
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

  const [filter, setFilter] = useState({});
  const { push } = useRouter();
  const { getManyWithFilters, remove: deleteVehicle } = useVehicle();
  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const [searchParam, setsearchParam] = useState<any | undefined>(VehicleSearchParams.REGISTERNO);
  const [searchQ, setsearchQ] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  async function getVehicles(filter: any, reload?: any) {
    const _result: any = await getManyWithFilters(filter);
    await _result;
    if (_result?.data) {
      setTableData(_result?.data);
    } else {
      setTableData([]);
    }
  }
  useEffect(() => {
    getVehicles(filter);
  }, []);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered =
    searchParam !== undefined ||
    filterName !== '' ||
    filterRole !== 'all' ||
    filterStatus !== 'all';

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
    const deletedVehicle = await deleteVehicle(id);
    await deletedVehicle;

    if (deletedVehicle?.data&&deletedVehicle?.data.success) {
      enqueueSnackbar('Vehicle Deleted  Successfully');
      getVehicles(filter);
    } else {
      enqueueSnackbar(' This Vehicle Cant be Deleted');
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
    const _query = buildVehicleWhereFilter(searchParam, searchQ, filterStatus);
    getVehicles({
      ..._query,
    });
  };

  const handleEditRow = (id: string) => {
    push(PATH_VEHICLE.edit(paramCase(id.toString())));
  };
  const handleDetailRow = (id: string) => {
    push(PATH_VEHICLE.detail(paramCase(id.toString())));
  };
  const handleResetFilter = () => {
    setFilterName('');

    setFilterStatus('ALL');
    setsearchParam(undefined);
    setsearchQ('');
    getVehicles({});
  };

  const handleSearchParam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setsearchParam(event.target.value);
  };

  let _filterStatus: any[] = ['ALL'];
  _filterStatus = [_filterStatus, ...Object.keys(VehicleFilter)];

  let _searchParams: any[] = [];
  _searchParams = [_searchParams, ...Object.keys(VehicleSearchParams)];

  useEffect(() => {
    const _query = buildVehicleWhereFilter(searchParam, searchQ, filterStatus);
    getVehicles({
      ..._query,
    });
  }, [filterStatus]);

  return (
    <>
      <Head>
        <title>Vehicles </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Vehicles"
          links={[{ name: '', href: PATH_VEHICLE.root }]}
          action={
            <Button
              component={NextLink}
              href={PATH_VEHICLE.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Vehicle{' '}
            </Button>
          }
        />
        <Card>
          <VehicleTableToolbar
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
                      <VehicleTableRow
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
  inputData: IVehicle[];
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
      (vehicle) => vehicle.registerNo.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
function enqueueSnackbar(arg0: string) {
  throw new Error('Function not implemented.');
}
