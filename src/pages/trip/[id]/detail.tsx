// next
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import { useTrip } from 'src/modules/trip/hooks/useTrip';
import { PATH_TRIP } from 'src/routes/paths';
import TripBasicInfo from 'src/sections/trip/details/TripBasicInfo';
import TripDrivers from 'src/sections/trip/details/TripDrivers';
import TripTrips from 'src/sections/trip/details/TripTrips';
import TripVechicles from 'src/sections/trip/details/TripVechicles';


import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from 'src/_mock/arrays';

TripDetailPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function TripDetailPage() {
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
      component: <TripBasicInfo id={id} />,
    },
    {
      value: 'trips',
      label: 'Trips',
      icon: <Iconify icon="bx:trip" />,
      component: <TripTrips id={id} />,
    },
    {
      value: 'vehicles',
      label: 'Vehicles',
      icon: <Iconify icon="ic:baseline-directions-car" />,
      component: <TripVechicles id={id} />,
    },
    {
      value: 'drivers',
      label: 'Drivers',
      icon: <Iconify icon="healthicons:truck-driver" />,
      component: (
        <TripDrivers id={id} />
      ),
    },
    {
      value: 'locations',
      label: 'Serving Locations',
      icon: <Iconify icon="iconoir:stats-report" />,
      component: (
        <TripDrivers id={id} />
      ),
    },
    {
      value: 'reports',
      label: 'Reports',
      icon: <Iconify icon="iconoir:stats-report" />,
      component: (
        <TripDrivers id={id} />
      ),
    },
    {
      value: 'payments',
      label: 'Payments',
      icon: <Iconify icon="mdi:payment-settings" />,
      component: (
        <TripDrivers id={id} />
      ),
    },


  ];

  return (<>
    <Head>
      <title> User: Edit user | Minimal UI</title>
    </Head>


    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={"Trip ID : " + id}
        links={[
          { name: 'Trips', href: PATH_TRIP.root },

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
