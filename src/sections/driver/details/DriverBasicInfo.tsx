import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDriver } from 'src/modules/driver/hooks/useDriver';
import DriverAboutDetail from './components/About';
import DriverDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function DriverBasicInfo({ id }: Props) {

    const [_driver, set_driver] = useState<any>();
    const { update, get } = useDriver();
    useEffect(() => {
        if (id) {
            driverGet(id);
        }
    }, [id]);


    async function driverGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_driver(res?.data);
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
    ><DriverAboutDetail {..._driver} />
        <DriverDocumentationDetail {..._driver} /></Box>)
}

export default DriverBasicInfo