import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useVehicletype } from 'src/modules/vehicletype/hooks/useVehicletype';
import VehicletypeAboutDetail from './components/About';

type Props = {
  id: any;
};

function VehicletypeBasicInfo({ id }: Props) {
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

  return (
    <Box
      rowGap={3}
      columnGap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
      }}
    >
      <VehicletypeAboutDetail {..._vehicletype} />
    </Box>
  );
}

export default VehicletypeBasicInfo;
