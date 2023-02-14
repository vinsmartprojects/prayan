// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD, PATH_VEHICLETYPE } from 'src/routes/paths';
import VehicletypeNewEditForm from 'src/sections/vehicletype/VehicletypeNewEditForm';

// ----------------------------------------------------------------------

VehicletypeNewPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function VehicletypeNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Vehicle type | Create - {APP_NAME}</title>      </Head>

     
        <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Vehicle Type"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Vehicles Type',
              href: PATH_VEHICLETYPE.list,
            },
            { name: 'New ' },
          ]}
        />
        <VehicletypeNewEditForm />
      </Container>
    </>
  );
}
