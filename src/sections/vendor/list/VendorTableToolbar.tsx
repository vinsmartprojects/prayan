// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  searchValue: string;
  filterRole: string;
  isFiltered: boolean;
  optionsRole: any,
  onResetFilter: VoidFunction;
  onSearchFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function VendorTableToolbar({
  isFiltered,
  onSearchFilter,
  filterRole,
  optionsRole,
  searchValue,
  onFilterRole,
  onResetFilter,
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
        label="Search By"
        value={filterRole}
        onChange={onFilterRole}
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
        {optionsRole.map((option: any) => (
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
        onChange={onSearchFilter}
        placeholder="Search..."
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
