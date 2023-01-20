// @mui
import { Stack, Button } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// locales

// ----------------------------------------------------------------------

export default function NavDocs() {
 
  const { logout } = useAuthContext();
 

  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        display: 'block',
        textAlign: 'center',
      }}
    >
     <Button variant="outlined" color="info" onClick={logout}>
        {' '}
        Logout
      </Button>
    </Stack>
  );
}
