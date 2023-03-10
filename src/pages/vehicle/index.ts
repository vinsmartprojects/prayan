import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_VEHICLE } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/vehicle') {
      router.push(PATH_VEHICLE.list);
    }
  });

  return null;
}
