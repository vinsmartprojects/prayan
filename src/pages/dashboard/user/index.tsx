import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography } from '@mui/material';
import { Head } from 'next/document';
import { useSettingsContext } from 'src/components/settings';
import { APP_NAME } from 'src/assets/data/common';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  const { themeStretch } = useSettingsContext();
  useEffect(() => {

  });

  return (<><Head>
    <title> Dashboard | {APP_NAME}</title>
  </Head>

    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Typography variant="h3" component="h1" paragraph>
        {APP_NAME}
      </Typography>



      <Typography>

      </Typography>
    </Container></>)
}
