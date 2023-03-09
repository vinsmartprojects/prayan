import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useUser } from 'src/modules/user/hooks/useUser';
import UserAboutDetail from './components/About';
import UserDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function UserBasicInfo({ id }: Props) {

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


    return (<Box
        rowGap={3}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
        }}
    ><UserAboutDetail {..._user} />
        <UserDocumentationDetail {..._user} /></Box>)
}

export default UserBasicInfo