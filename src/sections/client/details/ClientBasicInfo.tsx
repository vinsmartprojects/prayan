import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useClient } from 'src/modules/client/hooks/useClient';
import ClientAboutDetail from './components/About';
import ClientDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function ClientBasicInfo({ id }: Props) {

    const [_client, set_client] = useState<any>();
    const { update, get } = useClient();
    useEffect(() => {
        if (id) {
            clientGet(id);
        }
    }, [id]);


    async function clientGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_client(res?.data);
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
    ><ClientAboutDetail {..._client} />
        <ClientDocumentationDetail {..._client} /></Box>)
}

export default ClientBasicInfo