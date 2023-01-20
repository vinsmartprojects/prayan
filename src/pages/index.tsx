import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.push(PATH_AUTH.login);
    }
  });

  return null;
}
