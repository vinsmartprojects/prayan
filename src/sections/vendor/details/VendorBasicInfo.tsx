import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useVendor } from 'src/modules/vendor/hooks/useVendor';
import VendorAboutDetail from './components/About';
import VendorDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function VendorBasicInfo({ id }: Props) {

    const [_vendor, set_vendor] = useState<any>();
    const { update, get } = useVendor();
    useEffect(() => {
        if (id) {
            vendorGet(id);
        }
    }, [id]);


    async function vendorGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_vendor(res?.data);
            });
    }


    return (<Box
        rowGap={3}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
        }}
    ><VendorAboutDetail {..._vendor} />
        <VendorDocumentationDetail {..._vendor} /></Box>)
}

export default VendorBasicInfo