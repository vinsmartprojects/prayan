// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';


// ----------------------------------------------------------------------

VendorNewPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function VendorNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Home</title>      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph />
      </Container>
    </>
  );
}
