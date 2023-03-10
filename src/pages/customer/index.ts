import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_CUSTOMER } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/customer') {
      router.push(PATH_CUSTOMER.list);
    }
  });

  return null;
}
