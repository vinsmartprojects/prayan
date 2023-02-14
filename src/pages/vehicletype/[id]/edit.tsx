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
import { PATH_DASHBOARD, PATH_VEHICLETYPE } from 'src/routes/paths';
import VehicletypeEditForm from 'src/sections/Vehicletype/VehicletypeEditForm';
import { useVehicletype } from 'src/modules/Vehicletype/hooks/useVehicletype';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_vehicletype, set_vehicletype] = useState<any>();
  const { update, get } = useVehicletype();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      vehicletypeGet(id);
    }
  }, [id]);

  async function vehicletypeGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_vehicletype(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_vehicletype?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_VEHICLETYPE.root,
            },
            {
              name: 'User',
              href: PATH_VEHICLETYPE.list,
            },
            { name: _vehicletype?.name },
          ]}
        />

        <VehicletypeEditForm isEdit vehicletype={_vehicletype} />
      </Container>
    </>
  );
}
