// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { ILocation } from 'src/@types/location';
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

export default function LocationAboutDetail({
    name, code, pincode, longitude, latitude
}: ILocation) {
    return (
        <Card>
            <CardHeader name={name} />

            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row">
                    <StyledIcon icon="eva:pin-fill" />
                    <Typography variant="body2">{code}</Typography>
                </Stack>

                <Stack direction="row">
                    <StyledIcon icon="material-symbols:location-chip-outline" />
                    <Typography variant="body2">{pincode}</Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:location-chip-outline" />
                    <Typography variant="body2">{longitude}</Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:location-chip-outline" />
                    <Typography variant="body2">{latitude}</Typography>
                </Stack>
                
            </Stack>
        </Card>
    );
}
