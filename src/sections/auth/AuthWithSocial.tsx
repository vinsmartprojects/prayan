// @mui
import { Divider, IconButton, Stack } from '@mui/material';
// auth
 
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
 



  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton onClick={() => { }}>
          <Iconify icon="eva:google-fill" color="#DF3E30" />
        </IconButton>

        <IconButton color="inherit" onClick={() => { }}>
          <Iconify icon="eva:github-fill" />
        </IconButton>

        <IconButton onClick={() => { }}>
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
        </IconButton>
      </Stack>
    </div>
  );
}
