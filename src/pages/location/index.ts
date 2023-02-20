import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_LOCATION } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/location') {
      router.push(PATH_LOCATION.list);
    }
  });

  return null;
}
