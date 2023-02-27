// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD, PATH_PLAN } from 'src/routes/paths';
import PlanNewForm from 'src/sections/plan/PlanNewForm';

// ----------------------------------------------------------------------

PlanNewPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PlanNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Plan | Create - {APP_NAME}</title>      </Head>

     
        <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Plan"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Plans',
              href: PATH_PLAN.list,
            },
            { name: 'New ' },
          ]}
        />
        <PlanNewForm />
      </Container>
    </>
  );
}
