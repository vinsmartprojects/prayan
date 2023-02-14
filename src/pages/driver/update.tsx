// next
import { Container, Typography } from '@mui/material';
// layouts

import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';


// ----------------------------------------------------------------------

VendorUpdatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function VendorUpdatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Typography variant="h3" component="h1" paragraph />
    </Container>
  );
}
