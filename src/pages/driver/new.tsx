// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD, PATH_DRIVER } from 'src/routes/paths';
import DriverNewForm from 'src/sections/driver/DriverNewForm';

// ----------------------------------------------------------------------

DriverNewPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DriverNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Driver | Create - {APP_NAME}</title>      </Head>

     
        <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Driver"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'drivers',
              href: PATH_DRIVER.list,
            },
            { name: 'New ' },
          ]}
        />
        <DriverNewForm />
      </Container>
    </>
  );
}
