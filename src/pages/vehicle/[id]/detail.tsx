// next
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import { useVehicle } from 'src/modules/vehicle/hooks/useVehicle';
import { PATH_VEHICLE } from 'src/routes/paths';
import VehicleBasicInfo from 'src/sections/vehicle/details/VehicleBasicInfo';
import VehicleDrivers from 'src/sections/vehicle/details/VehicleDrivers';
import VehicleTrips from 'src/sections/vehicle/details/VehicleTrips';
import VehicleVechicles from 'src/sections/vehicle/details/VehicleVechicles';


import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from 'src/_mock/arrays';

VehicleDetailPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function VehicleDetailPage() {
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
      component: <VehicleBasicInfo id={id} />,
    },
    {
      value: 'trips',
      label: 'Trips',
      icon: <Iconify icon="bx:trip" />,
      component: <VehicleTrips id={id} />,
    },
    {
      value: 'vehicles',
      label: 'Vehicles',
      icon: <Iconify icon="ic:baseline-directions-car" />,
      component: <VehicleVechicles id={id} />,
    },
    {
      value: 'drivers',
      label: 'Drivers',
      icon: <Iconify icon="healthicons:truck-driver" />,
      component: (
        <VehicleDrivers id={id} />
      ),
    },
    {
      value: 'locations',
      label: 'Serving Locations',
      icon: <Iconify icon="iconoir:stats-report" />,
      component: (
        <VehicleDrivers id={id} />
      ),
    },
    {
      value: 'reports',
      label: 'Reports',
      icon: <Iconify icon="iconoir:stats-report" />,
      component: (
        <VehicleDrivers id={id} />
      ),
    },
    {
      value: 'payments',
      label: 'Payments',
      icon: <Iconify icon="mdi:payment-settings" />,
      component: (
        <VehicleDrivers id={id} />
      ),
    },


  ];

  return (<>
    <Head>
      <title> User: Edit user | Minimal UI</title>
    </Head>


    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={"Vehicle type ID : " + id}
        links={[
          { name: 'Vehicle types', href: PATH_VEHICLE.root },

          { name: 'Details' },
        ]}
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
    </Container></>

  );
}
