import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_PLAN } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/plan') {
      router.push(PATH_PLAN.list);
    }
  });

  return null;
}
