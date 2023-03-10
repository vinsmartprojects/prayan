// @mui
import { Typography, Stack } from '@mui/material';
// components
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';



type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {

  return (
    <StyledRoot>
      <StyledContent>
        <Stack sx={{ width: 1  }}> {children}
       </Stack>
     </StyledContent>

    </StyledRoot>
  );
}
