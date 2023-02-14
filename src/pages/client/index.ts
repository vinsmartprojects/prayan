import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_CLIENT } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/client') {
      router.push(PATH_CLIENT.list);
    }
  });

  return null;
}
