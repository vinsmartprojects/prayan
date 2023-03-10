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

export default function VehicleDocumentationDetail({
    rcBookDoc, rcNo, rcExpritationDate,insuranceDoc,insuranceNo,insurationExpritationDate,emissionDoc,emissionNo,emissionExpritationDate,taxDoc,taxno,taxExpritationDate,fcExpritationDate,remarks,fuelType,type,vendor,gpsBox,mobileDevice,isAc
}: IVehicle) {
    return (
        <Card>


            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row">
                     
                    <Typography variant="body2">RC BOOK DOC : {rcBookDoc}</Typography>
                </Stack>
                <Stack direction="row">
                     
                    <Typography variant="body2">RC NUMBER : {rcNo}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">RC EXPIRATION DATE : {rcExpritationDate}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">INSURANCE DOCUMENT : {insuranceDoc}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">INSURANCE NUMBER : {insuranceNo}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">INSURANCE EXPIRATION DATE : {insurationExpritationDate}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">EMISSION DOCUMENT : {emissionDoc}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">EMISSION NUMBER : {emissionNo}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">EMISSION EXPIRATION DATE : {emissionExpritationDate}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">TAX DOCUMENT : {taxDoc}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">TAX NUMBER : {taxno}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">TAX EXPIRATION DATE : {taxExpritationDate}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">FC EXPIRATION DATE : {fcExpritationDate}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">REMARKS : {remarks}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">FUEL TYPE : {fuelType}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">TYPE : {type}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">VENDOR : {vendor}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">GPS BOX : {gpsBox}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">MOBILE DEVICE : {mobileDevice}</Typography>
                </Stack>

                <Stack direction="row">
                     
                    <Typography variant="body2">IS AC AVAILABLE : {isAc}</Typography>
                </Stack>
                 
            </Stack>
        </Card>
    );
}
