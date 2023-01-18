// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { APP_NAME, APP_VERSION } from 'src/assets/data/common';
import { PageHeaderTitle } from 'src/components/extra/PageHeaderTitle';

// ----------------------------------------------------------------------

VendorUpdatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function VendorUpdatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <PageHeaderTitle title="Vendor Detail" />
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph></Typography>
      </Container>
    </>
  );
}
