import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useLocation } from 'src/modules/location/hooks/useLocation';
import LocationAboutDetail from './components/About';

type Props = {
    id: any
}

function LocationDrivers({ id }: Props) {

    const [_location, set_location] = useState<any>();
    const { update, get } = useLocation();
    useEffect(() => {
        if (id) {
            locationGet(id);
        }
    }, [id]);


    async function locationGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_location(res?.data);
            });
    }


    return (<div>  <EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default LocationDrivers