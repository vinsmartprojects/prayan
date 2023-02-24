import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useVehicle } from 'src/modules/vehicle/hooks/useVehicle';
import VehicleAboutDetail from './components/About';
import VehicleDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function VehicleBasicInfo({ id }: Props) {

    const [_vehicle, set_vehicle] = useState<any>();
    const { update, get } = useVehicle();
    useEffect(() => {
        if (id) {
            vehicleGet(id);
        }
    }, [id]);


    async function vehicleGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_vehicle(res?.data);
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
    ><VehicleAboutDetail {..._vehicle} />
        <VehicleDocumentationDetail {..._vehicle} /></Box>)
}

export default VehicleBasicInfo