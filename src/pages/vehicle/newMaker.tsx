// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD, PATH_VEHICLE } from 'src/routes/paths';
import VehicleMakerNewForm from 'src/sections/vehicle/settings/maker/VehicleMakerNewForm';

// ----------------------------------------------------------------------

VehicleNewPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function VehicleNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Vehicle  | Maker - {APP_NAME}</title>      </Head>

        <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Make "
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Vehicle ',
              href: PATH_VEHICLE.list,
            },
            { name: 'New Make' },
          ]}
        />
        <VehicleMakerNewForm />
      </Container>
    </>
  );
}
