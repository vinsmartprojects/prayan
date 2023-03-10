import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_VENDOR } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/vendor') {
      router.push(PATH_VENDOR.list);
    }
  });

  return null;
}
