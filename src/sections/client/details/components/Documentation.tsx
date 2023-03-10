// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { IClient } from 'src/@types/client';
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

export default function ClientDocumentationDetail({
    gst
}: IClient) {
    return (
        <Card>


            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row">
                     
                    <Typography variant="body2">GST NO : {gst}</Typography>
                </Stack>
               
                 
            </Stack>
        </Card>
    );
}
