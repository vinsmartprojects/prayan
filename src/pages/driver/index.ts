import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_DRIVER } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/driver') {
      router.push(PATH_DRIVER.list);
    }
  });

  return null;
}
