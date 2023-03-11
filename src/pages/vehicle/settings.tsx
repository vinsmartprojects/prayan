import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { PATH_VEHICLE } from 'src/routes/paths';
import DashboardLayout from '../../layouts/dashboard';
// components
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Typography,
} from '@mui/material';

import { useSettingsContext } from '../../components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD} from 'src/routes/paths';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
import MakerContainer from 'src/sections/vehicle/settings/maker/MakerContainer';
import ModelsContainer from 'src/sections/vehicle/settings/models/ModelsContainer';
import SegmentContainer from 'src/sections/vehicle/settings/segment/SegmentContainer';


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
      value: 'maker',
      label: 'Maker',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <MakerContainer />,
    },
    {
      value: 'models',
      label: 'Models',
      icon: <Iconify icon="bx:trip" />,
      component: <ModelsContainer  />,
    },
    {
      value: 'segment',
      label: 'Segment',
      icon: <Iconify icon="ic:baseline-directions-car" />,
      component: <SegmentContainer  />,
    },
  ];
  return (<>
    <Head>
      <title> Vehilce - Settings</title>
    </Head>
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={"Settings"}
        links={[
          { name: 'vehicles', href: PATH_VEHICLE.root },

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
