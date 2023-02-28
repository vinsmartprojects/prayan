import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'src/modules/location/hooks/useLocation';
import LocationAboutDetail from './components/About';


type Props = {
    id: any
}

function LocationBasicInfo({ id }: Props) {

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


    return (<Box
        rowGap={3}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
        }}
    ><LocationAboutDetail {..._location} />
        </Box>)
}

export default LocationBasicInfo