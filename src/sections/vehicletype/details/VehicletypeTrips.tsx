import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useVehicletype } from 'src/modules/vehicletype/hooks/useVehicletype';
import VehicletypeAboutDetail from './components/About';

type Props = {
    id: any
}

function VehicletypeTrip({ id }: Props) {

    const [_vehicletype, set_vehicletype] = useState<any>();
    const { update, get } = useVehicletype();
    useEffect(() => {
        if (id) {
            vehicletypeGet(id);
        }
    }, [id]);


    async function vehicletypeGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_vehicletype(res?.data);
            });
    }


    return (<div><EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default VehicletypeTrip