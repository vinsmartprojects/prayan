import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useUser } from 'src/modules/user/hooks/useUser';
import UserAboutDetail from './components/About';

type Props = {
    id: any
}

function UserDrivers({ id }: Props) {

    const [_user, set_user] = useState<any>();
    const { update, get } = useUser();
    useEffect(() => {
        if (id) {
            userGet(id);
        }
    }, [id]);


    async function userGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_user(res?.data);
            });
    }


    return (<div>  <EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default UserDrivers