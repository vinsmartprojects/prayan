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
import { PATH_DASHBOARD, PATH_DRIVER } from 'src/routes/paths';
import DriverEditForm from 'src/sections/driver/DriverEditForm';
import { useDriver } from 'src/modules/driver/hooks/useDriver';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_driver, set_driver] = useState<any>();
  const { update, get } = useDriver();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      driverGet(id);
    }
  }, [id]);

  async function driverGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_driver(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_driver?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DRIVER.root,
            },
            {
              name: 'Driverss',
              href: PATH_DRIVER.list,
            },
            { name: _driver?.name },
          ]}
        />

        <DriverEditForm isEdit driver={_driver} />
      </Container>
    </>
  );
}
