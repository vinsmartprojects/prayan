import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useVendor } from 'src/modules/vendor/hooks/useVendor';
import VendorAboutDetail from './components/About';

type Props = {
    id: any
}

function VendorLocations({ id }: Props) {

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


    return (<div><EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default VendorLocations