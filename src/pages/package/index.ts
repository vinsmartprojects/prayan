import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_PACKAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/package') {
      router.push(PATH_PACKAGE.list);
    }
  });

  return null;
}
