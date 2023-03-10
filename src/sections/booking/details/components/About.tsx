// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { IBooking } from 'src/@types/booking';
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

export default function BookingAboutDetail({
    title, contactEmail, contactMobile, contactPerson, address
}: IBooking) {
    return (
        <Card>
            <CardHeader title={title} />

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
                    <StyledIcon icon="material-symbols:person-2-outline" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {contactPerson}
                        </Link>
                    </Typography>
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
