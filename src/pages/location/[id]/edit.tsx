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
import { PATH_DASHBOARD, PATH_LOCATON } from 'src/routes/paths';
import LocationEditForm from 'src/sections/location/LocationEditForm';
import { useLocation } from 'src/modules/location/hooks/useLocation';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_location, set_location] = useState<any>();
  const { update, get } = useLocation();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      locationGet(id);
    }
  }, [id]);

  async function locationGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_location(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_location?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_LOCATION.root,
            },
            {
              name: 'Locations',
              href: PATH_LOCATION.list,
            },
            { name: _location?.name },
          ]}
        />

        <LocationEditForm isEdit location={_location} />
      </Container>
    </>
  );
}
