import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { usePlan } from 'src/modules/plan/hooks/usePlan';
import PlanAboutDetail from './components/About';

type Props = {
    id: any
}

function PlanTrip({ id }: Props) {

    const [_plan, set_plan] = useState<any>();
    const { update, get } = usePlan();
    useEffect(() => {
        if (id) {
            planGet(id);
        }
    }, [id]);


    async function planGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_plan(res?.data);
            });
    }


    return (<div><EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default PlanTrip