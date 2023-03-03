// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { CarSeating, Maker, TransmissionType, VehicleStatus, FilterType } from 'src/@types/vehicle';
import { VehicleSegment } from 'src/config-global';
import { useVendor } from 'src/modules/vendor/hooks/useVendor';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  searchValue: string;
  filterRole: string;
  isFiltered: boolean;
  filters: any;
  searchParam: any;
  onResetFilter: VoidFunction;
  onFilterChange: (key: any, event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchParam: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: VoidFunction;
};

export default function VehicleTableToolbar({
  isFiltered,
  filters,
  filterRole,
  onFilterChange,
  searchValue,
  onFilterRole,
  onResetFilter,
  onSearchValue,
  onSearchParam,
  onSearchSubmit,
}: Props) {
  const { getMany } = useVendor();
  const [vendors, setvendors] = useState<any>([]);
  useEffect(() => {}, [filters]);

  useEffect(() => {
    loadVendors();
  }, []);

  async function loadVendors() {
    const { data } = await getMany();

    await data;
    console.log(data);

    if (data && data.length > 0) {
      setvendors(data);
    }
  }
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        select
        label="Status"
        value={filters?.status}
        onChange={(e: any) => {
          onFilterChange('status', e);
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {Object.values(VehicleStatus).map((option: any) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Maker"
        value={filters?.make}
        onChange={(e: any) => {
          onFilterChange('make', e);
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {Object.values(Maker).map((option: any) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Segment"
        value={filters?.bodySegment}
        onChange={(e: any) => {
          onFilterChange('bodySegment', e);
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {Object.values(VehicleSegment).map((option: any) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Seating"
        value={filters?.seatingCapacity}
        onChange={(e: any) => {
          onFilterChange('seatingCapacity', e);
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {Object.values(CarSeating).map((option: any) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Vendor"
        value={filters?.vendor}
        onChange={(e: any) => {
          onFilterChange('vendor', e);
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {vendors.map((option: any) => (
          <MenuItem
            key={option?.id}
            value={option?.id}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option?.title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Transmission"
        value={filters?.transmissionType}
        onChange={(e: any) => {
          onFilterChange('transmissionType', e);
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {Object.values(TransmissionType).map((option: any) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={searchValue}
        onChange={onSearchValue}
        placeholder="Search Reg No"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      {isFiltered && (
        <Button
          color="success"
          sx={{ flexShrink: 0 }}
          onClick={onSearchSubmit}
          startIcon={<Iconify icon="material-symbols:search-sharp" />}
        >
          Search
        </Button>
      )}
      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
