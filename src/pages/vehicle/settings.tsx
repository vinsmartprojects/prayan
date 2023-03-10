import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_VEHICLE } from 'src/routes/paths';
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD} from 'src/routes/paths';
import VehicleNewForm from 'src/sections/vehicle/VehicleNewForm';
// ----------------------------------------------------------------------
VehicleSettings.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;
export default function VehicleSettings() {
  let message: string = 'Hello World';
console.log(message);

  return null;
}