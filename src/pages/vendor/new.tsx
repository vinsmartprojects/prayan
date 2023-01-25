// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { APP_NAME } from 'src/assets/data/common';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD, PATH_VENDOR } from 'src/routes/paths';
import VendorNewEditForm from 'src/sections/vendor/VendorNewEditForm';

// ----------------------------------------------------------------------

VendorNewPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function VendorNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Vendor | Create - {APP_NAME}</title>      </Head>

     
        <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Vendor"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Vendors',
              href: PATH_VENDOR.list,
            },
            { name: 'New ' },
          ]}
        />
        <VendorNewEditForm />
      </Container>
    </>
  );
}
