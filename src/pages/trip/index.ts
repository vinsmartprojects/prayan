import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_TRIP } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/trip') {
      router.push(PATH_TRIP.list);
    }
  });

  return null;
}
