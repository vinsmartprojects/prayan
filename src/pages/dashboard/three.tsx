// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { Address, AddressProps } from 'src/components/extra/Address';
import { PageHeaderTitle } from 'src/components/extra/PageHeaderTitle';

// ----------------------------------------------------------------------

PageThree.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function PageThree() {
  const { themeStretch } = useSettingsContext();

  const _address: AddressProps = {
    line1: '#31, appaji canteen',
    line2: 'srinvar',
    area: 'Srinagar',
    city: 'Banaglore',
    pincode: '560050',
    country: 'India',
  };
  return (
    <>
      <Head>
        <PageHeaderTitle title="Dashboard" />
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Page Three
        </Typography>

        <Address address={_address} inline />
      </Container>
    </>
  );
}
