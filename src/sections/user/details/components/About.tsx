// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { IUser } from 'src/@types/user';
// @types


// components


// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function UserAboutDetail({
    name, contactEmail, contactMobile, address
}: IUser) {
    return (
        <Card>
            <CardHeader name={name} />

            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row">
                    <StyledIcon icon="eva:pin-fill" />
                    <Typography variant="body2">{address?.addressLine1 + " " + address?.addressLine2 + " " + address?.area + " " + address?.city + " "}</Typography>
                </Stack>

                <Stack direction="row">
                    <StyledIcon icon="material-symbols:location-chip-outline" />
                    <Typography variant="body2">{address?.pincode + " "}</Typography>
                </Stack>
                
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:phone-enabled-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {contactMobile}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {contactEmail}
                        </Link>
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
