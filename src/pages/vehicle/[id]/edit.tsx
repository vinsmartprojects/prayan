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
import VehicleEditForm from 'src/sections/vehicle/VehicleEditForm';
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
        <title> Vehicles: Edit Vehicles | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_vehicle?.registerNo}
          links={[
            {
              name: 'Vehicles',

              href: PATH_VEHICLE.list,
            },
            { name: _vehicle?.registerNo },
          ]}
        />

        <VehicleEditForm isEdit currentVehicle={_vehicle} />
      </Container>
    </>
  );
}
