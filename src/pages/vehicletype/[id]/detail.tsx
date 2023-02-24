// next
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import { useVehicletype } from 'src/modules/vehicletype/hooks/useVehicletype';
import { PATH_VEHICLETYPE } from 'src/routes/paths';
import VehicletypeBasicInfo from 'src/sections/vehicletype/details/VehicletypeBasicInfo';
import VehicletypeDrivers from 'src/sections/vehicletype/details/VehicletypeDrivers';
import VehicletypeTrips from 'src/sections/vehicletype/details/VehicletypeTrips';
import VehicletypeVechicles from 'src/sections/vehicletype/details/VehicletypeVechicles';

import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from 'src/_mock/arrays';

VehicletypeDetailPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function VehicletypeDetailPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();

  const [currentTab, setCurrentTab] = useState('general');

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <VehicletypeBasicInfo id={id} />,
    },

    {
      value: 'vehicles',
      label: 'Vehicles',
      icon: <Iconify icon="ic:baseline-directions-car" />,
      component: <VehicletypeVechicles id={id} />,
    },

    {
      value: 'reports',
      label: 'Reports',
      icon: <Iconify icon="iconoir:stats-report" />,
      component: <VehicletypeDrivers id={id} />,
    },
  ];

  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={'Vehicle Segment ID : ' + id}
          links={[{ name: 'Vehicle types', href: PATH_VEHICLETYPE.root }, { name: 'Details' }]}
        />

        <Tabs value={currentTab} onChange={(event: any, newValue: any) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
