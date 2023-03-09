import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_SETTING } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/setting') {
      router.push(PATH_SETTING.list);
    }
  });

  return null;
}
