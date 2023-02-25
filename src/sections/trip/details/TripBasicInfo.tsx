import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTrip } from 'src/modules/trip/hooks/useTrip';
import TripAboutDetail from './components/About';
import TripDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function TripBasicInfo({ id }: Props) {

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


    return (<Box
        rowGap={3}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
        }}
    ><TripAboutDetail {..._trip} />
        <TripDocumentationDetail {..._trip} /></Box>)
}

export default TripBasicInfo