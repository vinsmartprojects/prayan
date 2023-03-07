// next
import { Container, Typography } from '@mui/material';
// layouts

import DashboardLayout from 'src/layouts/dashboard';
// components
import { useSettingsContext } from 'src/components/settings';


// ----------------------------------------------------------------------

VehicleModelsUpdatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function VehicleModelsUpdatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Typography variant="h3" component="h1" paragraph />
    </Container>
  );
}
