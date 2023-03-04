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
import VehicleMakerSection from 'src/sections/vehicle/settings/maker/VehicleMaker';
import VehicleModelsSection from 'src/sections/vehicle/settings/models/VehicleModels';
import VehicleSegmentSection from 'src/sections/vehicle/settings/segment/VehicleSegment';


import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from 'src/_mock/arrays';

VehicleSettingsPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function VehicleSettingsPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();



  const [currentTab, setCurrentTab] = useState('general');

  const TABS = [
    {
      value: 'models',
      label: 'Models',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <VehicleModelsSection/>,
    },
    {
      value: 'maker',
      label: 'Maker',
      icon: <Iconify icon="bx:trip" />,
      component: <VehicleMakerSection/>,
    },
    {
      value: 'segment',
      label: 'Segment',
      icon: <Iconify icon="ic:baseline-directions-car" />,
      component: <VehicleSegmentSection/>,
    },
   


  ];

  return (<>
    <Head>
      <title> User: Edit user | Minimal UI</title>
    </Head>


    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={"Vehicle Settings: "}
        links={[
          { name: 'Vehicles', href: PATH_VEHICLE.root },

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
