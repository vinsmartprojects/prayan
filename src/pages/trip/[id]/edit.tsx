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
import { PATH_DASHBOARD, PATH_TRIP } from 'src/routes/paths';
import TripEditForm from 'src/sections/trip/TripEditForm';
import { useTrip } from 'src/modules/trip/hooks/useTrip';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_trip, set_trip] = useState<any>();
  const { update, get } = useTrip();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      tripGet(id);
    }
  }, [id]);

  async function tripGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_trip(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_trip?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_TRIP.root,
            },
            {
              name: 'Trips',
              href: PATH_TRIP.list,
            },
            { name: _trip?.name },
          ]}
        />

        <TripEditForm isEdit trip={_trip} />
      </Container>
    </>
  );
}
