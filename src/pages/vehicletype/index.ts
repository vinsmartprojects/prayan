import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_VEHICLETYPE } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/vehicletype') {
      router.push(PATH_VEHICLETYPE.list);
    }
  });

  return null;
}
