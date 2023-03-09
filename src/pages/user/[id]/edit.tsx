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
import { PATH_DASHBOARD, PATH_USER } from 'src/routes/paths';
import UserEditForm from 'src/sections/user/UserEditForm';
import { useUser } from 'src/modules/user/hooks/useUser';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_user, set_user] = useState<any>();
  const { update, get } = useUser();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      userGet(id);
    }
  }, [id]);

  async function userGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_user(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_user?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_USER.root,
            },
            {
              name: 'Users',
              href: PATH_USER.list,
            },
            { name: _user?.name },
          ]}
        />

        <UserEditForm isEdit user={_user} />
      </Container>
    </>
  );
}
