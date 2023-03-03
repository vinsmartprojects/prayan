// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
import { CarSeating, Makers, TransmissionType, VehicleFilter } from 'src/@types/vehicle';
import { VehicleSegment } from 'src/config-global';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  searchValue: string;
  filterRole: string;
  isFiltered: boolean;
  searchParams: any;
  searchParam: any;
  onResetFilter: VoidFunction;

  onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchParam: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: VoidFunction;
};

export default function VehicleTableToolbar({
  isFiltered,
  searchParam,
  filterRole,
  searchParams,
  searchValue,
  onFilterRole,
  onResetFilter,
  onSearchValue,
  onSearchParam,
  onSearchSubmit,
}: Props) {
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
        value={searchParam?.staus}
        onChange={onSearchParam}
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
        {Object.values(VehicleFilter).map((option: any) => (
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
        value={searchParam?.maker}
        onChange={onSearchParam}
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
        {Object.values(Makers).map((option: any) => (
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
        value={searchParam?.segment}
        onChange={onSearchParam}
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
        value={searchParam?.seating}
        onChange={onSearchParam}
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
        value={searchParam?.Vendor}
        onChange={onSearchParam}
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
        {Object.values(Makers).map((option: any) => (
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
        label="Transmission"

        value={searchParam?.transmission}
        onChange={onSearchParam}
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
