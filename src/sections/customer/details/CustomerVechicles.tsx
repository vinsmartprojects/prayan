import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useCustomer } from 'src/modules/customer/hooks/useCustomer';
import CustomerAboutDetail from './components/About';

type Props = {
    id: any
}

function CustomerVechicles({ id }: Props) {

    const [_customer, set_customer] = useState<any>();
    const { update, get } = useCustomer();
    useEffect(() => {
        if (id) {
            customerGet(id);
        }
    }, [id]);


    async function customerGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_customer(res?.data);
            });
    }


    return (<div><EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default CustomerVechicles