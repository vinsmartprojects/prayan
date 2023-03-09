// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD, PATH_SETTING } from 'src/routes/paths';
import SettingNewForm from 'src/sections/setting/SettingNewForm';

// ----------------------------------------------------------------------

SettingNewPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function SettingNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Setting | Create - {APP_NAME}</title>      </Head>

     
        <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Setting"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Settings',
              href: PATH_SETTING.list,
            },
            { name: 'New ' },
          ]}
        />
        <SettingNewForm />
      </Container>
    </>
  );
}
