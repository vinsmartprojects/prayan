// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
import { _analyticPost, _analyticOrderTimeline, _analyticTraffic } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import { useAuthContext } from 'src/auth/useAuthContext';
// sections

// ----------------------------------------------------------------------

GeneralAnalyticsPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function GeneralAnalyticsPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  return (
    <>
      <Head>
        <title> General: Analytics | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, {user?.username}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </>
  );
}
