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
import { PATH_DASHBOARD, PATH_PACKAGE } from 'src/routes/paths';
import PackageEditForm from 'src/sections/package/PackageEditForm';
import { usePackage } from 'src/modules/package/hooks/usePackage';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_package, set_package] = useState<any>();
  const { update, get } = usePackage();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      packageGet(id);
    }
  }, [id]);

  async function packageGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_package(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_package?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_PACKAGE.root,
            },
            {
              name: 'User',
              href: PATH_PACKAGE.list,
            },
            { name: _package?.name },
          ]}
        />

        <PackageEditForm isEdit package={_package} />
      </Container>
    </>
  );
}
