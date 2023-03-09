import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSetting } from 'src/modules/setting/hooks/useSetting';
import SettingAboutDetail from './components/About';
import SettingDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function SettingBasicInfo({ id }: Props) {

    const [_setting, set_setting] = useState<any>();
    const { update, get } = useSetting();
    useEffect(() => {
        if (id) {
            settingGet(id);
        }
    }, [id]);


    async function settingGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_setting(res?.data);
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
    ><SettingAboutDetail {..._setting} />
        <SettingDocumentationDetail {..._setting} /></Box>)
}

export default SettingBasicInfo