// next
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import { usePlan } from 'src/modules/plan/hooks/usePlan';
import { PATH_PLAN } from 'src/routes/paths';
import PlanBasicInfo from 'src/sections/plan/details/PlanBasicInfo';
import PlanDrivers from 'src/sections/plan/details/PlanDrivers';
import PlanTrips from 'src/sections/plan/details/PlanTrips';
import PlanVechicles from 'src/sections/plan/details/PlanVechicles';


import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from 'src/_mock/arrays';

PlanDetailPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function PlanDetailPage() {
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
      component: <PlanBasicInfo id={id} />,
    },
    {
      value: 'trips',
      label: 'Trips',
      icon: <Iconify icon="bx:trip" />,
      component: <PlanTrips id={id} />,
    },
    {
      value: 'vehicles',
      label: 'Vehicles',
      icon: <Iconify icon="ic:baseline-directions-car" />,
      component: <PlanVechicles id={id} />,
    },
    {
      value: 'drivers',
      label: 'Drivers',
      icon: <Iconify icon="healthicons:truck-driver" />,
      component: (
        <PlanDrivers id={id} />
      ),
    },
    {
      value: 'locations',
      label: 'Serving Locations',
      icon: <Iconify icon="iconoir:stats-report" />,
      component: (
        <PlanDrivers id={id} />
      ),
    },
    {
      value: 'reports',
      label: 'Reports',
      icon: <Iconify icon="iconoir:stats-report" />,
      component: (
        <PlanDrivers id={id} />
      ),
    },
    {
      value: 'payments',
      label: 'Payments',
      icon: <Iconify icon="mdi:payment-settings" />,
      component: (
        <PlanDrivers id={id} />
      ),
    },


  ];

  return (<>
    <Head>
      <title> User: Edit user | Minimal UI</title>
    </Head>


    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={"Plan ID : " + id}
        links={[
          { name: 'Plans', href: PATH_PLAN.root },

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
