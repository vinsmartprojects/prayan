import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useVehicle } from 'src/modules/vehicle/hooks/useVehicle';
import VehicleAboutDetail from './components/About';

type Props = {
    id: any
}

function VehicleTrip({ id }: Props) {

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


    return (<div><EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default VehicleTrip