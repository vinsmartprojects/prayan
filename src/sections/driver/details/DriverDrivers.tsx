import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useDriver } from 'src/modules/driver/hooks/useDriver';
import DriverAboutDetail from './components/About';

type Props = {
    id: any
}

function DriverDrivers({ id }: Props) {

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


    return (<div>  <EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default DriverDrivers