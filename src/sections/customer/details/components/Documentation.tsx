// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { ICustomer } from 'src/@types/customer';
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

export default function CustomerDocumentationDetail({
    identyCardNo
}: ICustomer) {
    return (
        <Card>
            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row">
                    <Typography variant="body2">Identy Card NO : {identyCardNo}</Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
