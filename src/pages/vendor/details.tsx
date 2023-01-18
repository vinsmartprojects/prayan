// next
import { Container, Typography } from '@mui/material';
import Head from 'next/head';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { PageHeaderTitle } from 'src/components/extra/PageHeaderTitle';
import { useSettingsContext } from '../../components/settings';

 

VendorDetailPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

 

export default function VendorDetailPage() {
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
