import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { usePlan } from 'src/modules/plan/hooks/usePlan';
import PlanAboutDetail from './components/About';
import PlanDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function PlanBasicInfo({ id }: Props) {

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


    return (<Box
        rowGap={3}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
        }}
    ><PlanAboutDetail {..._plan} />
        <PlanDocumentationDetail {..._plan} /></Box>)
}

export default PlanBasicInfo