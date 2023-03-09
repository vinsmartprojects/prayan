// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD, PATH_USER } from 'src/routes/paths';
import UserNewForm from 'src/sections/user/UserNewForm';

// ----------------------------------------------------------------------

UserNewPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>User | Create - {APP_NAME}</title>      </Head>

     
        <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create User"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Users',
              href: PATH_USER.list,
            },
            { name: 'New ' },
          ]}
        />
        <UserNewForm />
      </Container>
    </>
  );
}
