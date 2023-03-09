import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_USER } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/user') {
      router.push(PATH_USER.list);
    }
  });

  return null;
}
