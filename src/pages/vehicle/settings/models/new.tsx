// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { APP_NAME } from 'src/assets/data/common';


import { PATH_VEHICLE } from 'src/routes/paths';
import { PATH_DASHBOARD } from 'src/routes/paths';
import VehicleModelsNewForm from 'src/sections/vehicle/settings/models/VehicleModelsNewForm';

// ----------------------------------------------------------------------

VehicleNewPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function VehicleNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Vehicle  | Models - {APP_NAME}</title>      </Head>

        <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Models "
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Vehicle ', href: PATH_VEHICLE.root },
             { name: 'Settings ', href: PATH_VEHICLE.root },
            { name: 'Models ', href: PATH_VEHICLE.root },
            { name: 'New' },
          ]}
        />
        <VehicleModelsNewForm />
      </Container>
    </>
  );
}
