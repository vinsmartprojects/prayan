// next
import { useState } from 'react';

import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';


// ----------------------------------------------------------------------

PageFive.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageFive() {
  const { themeStretch } = useSettingsContext();

  const [username, setusername] = useState('');
  return (
    <>
      <Head>
        <title> Page Five | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="body2" component="h1" paragraph>
          UserName
        </Typography>
        <input
          value={username}
          onChange={(e: any) => {
            setusername(e.target.value);
          }}
        />    
      </Container>
    </>
  );
}
