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
import { PATH_DASHBOARD, PATH_CLIENT } from 'src/routes/paths';
import ClientEditForm from 'src/sections/client/ClientEditForm';
import { useClient } from 'src/modules/client/hooks/useClient';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_client, set_client] = useState<any>();
  const { update, get } = useClient();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      clientGet(id);
    }
  }, [id]);

  async function clientGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_client(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_client?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_CLIENT.root,
            },
            {
              name: 'User',
              href: PATH_CLIENT.list,
            },
            { name: _client?.name },
          ]}
        />

        <ClientEditForm isEdit client={_client} />
      </Container>
    </>
  );
}
