// next
import Head from 'next/head';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useSettingsContext } from 'src/components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
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
          heading="Create Models "
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Vehicles ', href: PATH_VEHICLE.root },
             { name: 'Settings ', href: PATH_VEHICLE.root },
            { name: 'Models ', href: PATH_VEHICLE.root },
            { name: 'New' },
          ]}
        />
        <VehicleMakerNewForm />
      </Container>
    </>
  );
}
