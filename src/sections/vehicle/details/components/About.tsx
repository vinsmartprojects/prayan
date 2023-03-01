// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { IVehicle } from 'src/@types/vehicle';
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

export default function VehicleAboutDetail({
    registerNo, registrationType, permitType, permitNo, make, model,year,color,vin,trNo,chassiNo,engineNo,seatingCapacity
}: IVehicle) {
    return (
        <Card>
            <CardHeader registerNo={registerNo} />

            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row">
                    <StyledIcon icon="eva:pin-fill" />
                    <Typography variant="body2">{registerNo}</Typography>
                </Stack>

                <Stack direction="row">
                    <StyledIcon icon="material-symbols:location-chip-outline" />
                    <Typography variant="body2">{registrationType}</Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:person-2-outline" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {permitType}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:phone-enabled-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {permitNo}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {make}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {model}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {year}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {color}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {vin}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {trNo}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {chassiNo}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {engineNo}
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <StyledIcon icon="material-symbols:alternate-email-sharp" />

                    <Typography variant="body2">

                        <Link component="span" variant="subtitle2" color="text.primary">
                            {seatingCapacity}
                        </Link>
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
