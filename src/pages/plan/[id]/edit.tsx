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
import { PATH_DASHBOARD, PATH_PLAN } from 'src/routes/paths';
import PlanEditForm from 'src/sections/plan/PlanEditForm';
import { usePlan } from 'src/modules/plan/hooks/usePlan';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const [_plan, set_plan] = useState<any>();
  const { update, get } = usePlan();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      planGet(id);
    }
  }, [id]);

  async function planGet(id: any) {
    await get(id)
      .catch((e: any) => {
        console.log();
      })
      .then((res) => {
        console.log(res);
        set_plan(res?.data);
      });
  }
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={_plan?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_PLAN.root,
            },
            {
              name: 'Plans',
              href: PATH_PLAN.list,
            },
            { name: _plan?.name },
          ]}
        />

        <PlanEditForm isEdit plan={_plan} />
      </Container>
    </>
  );
}
