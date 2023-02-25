// next
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import { useClient } from 'src/modules/client/hooks/useClient';
import { PATH_CLIENT } from 'src/routes/paths';
import ClientBasicInfo from 'src/sections/client/details/ClientBasicInfo';
import ClientDrivers from 'src/sections/client/details/ClientDrivers';
import ClientTrips from 'src/sections/client/details/ClientTrips';
import ClientVechicles from 'src/sections/client/details/ClientVechicles';


import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from 'src/_mock/arrays';

ClientDetailPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function ClientDetailPage() {
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
      component: <ClientBasicInfo id={id} />,
    },
    {
      value: 'trips',
      label: 'Trips',
      icon: <Iconify icon="bx:trip" />,
      component: <ClientTrips id={id} />,
    },
    {
      value: 'vehicles',
      label: 'Vehicles',
      icon: <Iconify icon="ic:baseline-directions-car" />,
      component: <ClientVechicles id={id} />,
    },
    {
      value: 'drivers',
      label: 'Drivers',
      icon: <Iconify icon="healthicons:truck-driver" />,
      component: (
        <ClientDrivers id={id} />
      ),
    },
    {
      value: 'locations',
      label: 'Serving Locations',
      icon: <Iconify icon="iconoir:stats-report" />,
      component: (
        <ClientDrivers id={id} />
      ),
    },
    {
      value: 'reports',
      label: 'Reports',
      icon: <Iconify icon="iconoir:stats-report" />,
      component: (
        <ClientDrivers id={id} />
      ),
    },
    {
      value: 'payments',
      label: 'Payments',
      icon: <Iconify icon="mdi:payment-settings" />,
      component: (
        <ClientDrivers id={id} />
      ),
    },


  ];

  return (<>
    <Head>
      <title> User: Edit user | Minimal UI</title>
    </Head>


    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={"Client ID : " + id}
        links={[
          { name: 'Clients', href: PATH_CLIENT.root },

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
