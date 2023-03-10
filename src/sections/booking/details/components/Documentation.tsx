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

export default function BookingDocumentationDetail({
    cin, pan, gst
}: IBooking) {
    return (
        <Card>


            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row">
                     
                    <Typography variant="body2">GST NO : {gst}</Typography>
                </Stack>
                <Stack direction="row">
                     
                    <Typography variant="body2">PAN NO : {pan}</Typography>
                </Stack>
                 
            </Stack>
        </Card>
    );
}
