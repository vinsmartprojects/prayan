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
import { PATH_DASHBOARD, PATH_BOOKING } from 'src/routes/paths';
import BookingEditForm from 'src/sections/booking/BookingEditForm';
import { useBooking } from 'src/modules/booking/hooks/useBooking';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_booking, set_booking] = useState<any>();
  const { update, get } = useBooking();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      bookingGet(id);
    }
  }, [id]);

  async function bookingGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_booking(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_booking?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_BOOKING.root,
            },
            {
              name: 'User',
              href: PATH_BOOKING.list,
            },
            { name: _booking?.name },
          ]}
        />

        <BookingEditForm isEdit booking={_booking} />
      </Container>
    </>
  );
}
