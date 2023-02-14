// next
import { Container, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';

ClientDetailPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function ClientDetailPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Typography variant="h3" component="h1" paragraph />
    </Container>
  );
}