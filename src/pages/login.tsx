// next
import Head from 'next/head';
import { APP_NAME } from 'src/assets/data/common';

// auth
import GuestGuard from '../auth/GuestGuard';
// sections
import Login from '../sections/auth/Login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> Login | {APP_NAME}</title>
      </Head>
      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
