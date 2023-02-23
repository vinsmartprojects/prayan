// @mui
import { Stack, Typography, Link } from '@mui/material';
import { APP_NAME } from 'src/assets/data/common';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <LoginLayout title={APP_NAME}>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4"> Sign in </Typography>
       {/*  <Stack direction="row" spacing={1}>
          <Typography variant="body2">New user?</Typography>
          <Link variant="subtitle2">Create an account</Link>
        </Stack> */}
      </Stack>
     <AuthLoginForm />

      <AuthWithSocial />
    </LoginLayout>
  );
}
