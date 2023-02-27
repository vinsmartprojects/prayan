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
import { PATH_DASHBOARD, PATH_CUSTOMER } from 'src/routes/paths';
import CustomerEditForm from 'src/sections/customer/CustomerEditForm';
import { useCustomer } from 'src/modules/customer/hooks/useCustomer';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_customer, set_customer] = useState<any>();
  const { update, get } = useCustomer();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      customerGet(id);
    }
  }, [id]);

  async function customerGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_customer(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_customer?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_CUSTOMER.root,
            },
            {
              name: 'Customers',
              href: PATH_CUSTOMER.list,
            },
            { name: _customer?.name },
          ]}
        />

        <CustomerEditForm isEdit customer={_customer} />
      </Container>
    </>
  );
}
