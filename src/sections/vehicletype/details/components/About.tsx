// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { IVehicletype } from 'src/@types/vehicletype';
// @types

// components

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function VehicletypeAboutDetail({ id, name, features }: IVehicletype) {
  return (
    <Card>
      <CardHeader title={name} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
         

          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {features}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
