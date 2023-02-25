import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useClient } from 'src/modules/client/hooks/useClient';
import ClientAboutDetail from './components/About';

type Props = {
    id: any
}

function ClientLocations({ id }: Props) {

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


    return (<div><EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default ClientLocations