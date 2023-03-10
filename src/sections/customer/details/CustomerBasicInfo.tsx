import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useCustomer } from 'src/modules/customer/hooks/useCustomer';
import CustomerAboutDetail from './components/About';
import CustomerDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function CustomerBasicInfo({ id }: Props) {

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


    return (<Box
        rowGap={3}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
        }}
    ><CustomerAboutDetail {..._customer} />
        <CustomerDocumentationDetail {..._customer} /></Box>)
}

export default CustomerBasicInfo