import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useTrip } from 'src/modules/trip/hooks/useTrip';
import TripAboutDetail from './components/About';

type Props = {
    id: any
}

function TripVechicles({ id }: Props) {

    const [_trip, set_trip] = useState<any>();
    const { update, get } = useTrip();
    useEffect(() => {
        if (id) {
            tripGet(id);
        }
    }, [id]);


    async function tripGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_trip(res?.data);
            });
    }


    return (<div><EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default TripVechicles