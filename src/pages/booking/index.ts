import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_BOOKING } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
   /*  if (router.pathname === '/booking') {
      router.push(PATH_BOOKING.list);
    } */
  });

  return null;
}
