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
import { PATH_DASHBOARD, PATH_SETTING } from 'src/routes/paths';
import SettingEditForm from 'src/sections/setting/SettingEditForm';
import { useSetting } from 'src/modules/setting/hooks/useSetting';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_setting, set_setting] = useState<any>();
  const { update, get } = useSetting();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      settingGet(id);
    }
  }, [id]);

  async function settingGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_setting(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_setting?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_SETTING.root,
            },
            {
              name: 'Settings',
              href: PATH_SETTING.list,
            },
            { name: _setting?.name },
          ]}
        />

        <SettingEditForm isEdit setting={_setting} />
      </Container>
    </>
  );
}
