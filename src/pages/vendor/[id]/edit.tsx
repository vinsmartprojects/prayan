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
import { PATH_DASHBOARD, PATH_VENDOR } from 'src/routes/paths';
import VendorEditForm from 'src/sections/vendor/VendorEditForm';
import { useVendor } from 'src/modules/vendor/hooks/useVendor';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_vendor, set_vendor] = useState<any>();
  const { update, get } = useVendor();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      vendorGet(id);
    }
  }, [id]);

  async function vendorGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_vendor(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_vendor?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_VENDOR.root,
            },
            {
              name: 'Vendors',
              href: PATH_VENDOR.list,
            },
            { name: _vendor?.name },
          ]}
        />

        <VendorEditForm isEdit vendor={_vendor} />
      </Container>
    </>
  );
}
