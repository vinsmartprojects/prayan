import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';

import { useEffect, useState } from 'react';
import DashboardLayout from 'src/layouts/dashboard';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { PATH_DASHBOARD, PATH_VEHICLE } from 'src/routes/paths';
import VehicleMakerEditForm from 'src/sections/vehicle/settings/maker/VehicleMakerEditForm';
import { useVehicle } from 'src/modules/vehicle/hooks/useVehicle';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_vehicle, set_vehicle] = useState<any>();
  const { update, get } = useVehicle();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      vehicleGet(id);
    }
  }, [id]);

  async function vehicleGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_vehicle(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_vehicle?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_VEHICLE.root,
            },
            {
              name: 'Vehicle types',
              href: PATH_VEHICLE.list,
            },
            { name: _vehicle?.name },
          ]}
        />

        <VehicleMakerEditForm isEdit vehicle={_vehicle} />
      </Container>
    </>
  );
}
