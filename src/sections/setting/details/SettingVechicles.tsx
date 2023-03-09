import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useSetting } from 'src/modules/setting/hooks/useSetting';
import SettingAboutDetail from './components/About';

type Props = {
    id: any
}

function SettingVechicles({ id }: Props) {

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


    return (<div><EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default SettingVechicles